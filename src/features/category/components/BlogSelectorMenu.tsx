"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Blog, Category } from "@prisma/client";
import FeatherIcon from "feather-icons-react";
import InifiniteList from "./InifiniteList";
import {
  getRecentBlogs,
  searchBlogs,
} from "@/features/blog/interface/blog.controller";
import { Checkbox } from "@/components/ui/checkbox";
import {
  addBlogToCategory,
  getBlogsWithCategory,
  searchBlogsInCategory,
} from "../interface/category.controller";
import {
  InfiniteData,
  QueryFunctionContext,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";

interface BlogSelectorMenuProps {
  category: Category;
}

export default function BlogSelectorMenu({ category }: BlogSelectorMenuProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const queryFn = search
    ? async ({ pageParam }: { pageParam: number }) => {
        const blogs = await searchBlogsInCategory({
          categoryId: category.id,
          query: debouncedSearch,
          limit: 10,
          offset: pageParam * 10,
        });

        console.log(blogs);
        return {
          items: blogs.blogs,
          totalItems: blogs.totalBlogs,
        };
      }
    : async ({ pageParam }: { pageParam: number }) => {
        const blogs = await getBlogsWithCategory({
          categoryName: category.name,
          limit: 10,
          offset: pageParam * 10,
        });
        console.log(blogs);
        return {
          items: blogs.blogs,
          totalItems: blogs.totalBlogs,
        };
      };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      blogId,
      checked,
    }: {
      blogId: string;
      checked: boolean;
    }) => {
      // optimistically update
      queryClient.setQueryData(
        ["blogs", category.name],
        (
          oldData?: InfiniteData<{
            items: Blog[];
            totalItems: number;
          }>,
        ) => {
          if (!oldData) return oldData;

          const updatedPages = oldData.pages.map((page) => {
            const updatedItems = page.items.map((blog) =>
              blog.id === blogId
                ? { ...blog, categoryId: checked ? category.id : null }
                : blog,
            );

            return {
              ...page,
              items: updatedItems,
            };
          });

          return { ...oldData, pages: updatedPages };
        },
      );
      return await addBlogToCategory({
        categoryId: checked ? category.id : null,
        blogId,
      });
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: async () => {
      // Invalidate the query to refetch the data
      await queryClient.invalidateQueries({
        queryKey: ["blog", category.name],
      });
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["blogs", category.name],
    });
  }, [debouncedSearch]);

  return (
    <DropdownMenu key={category.id}>
      <DropdownMenuTrigger className="flex w-full items-center justify-between p-4 shadow-md">
        {category.name}
        <FeatherIcon icon="chevron-down" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{
          width: "var(--radix-dropdown-menu-trigger-width)",
        }}
        className="rounded-none p-4 pt-2"
      >
        <div className="flex items-center justify-between">
          <div className="text-caps3 uppercase text-muted-foreground">
            Available Blogs
          </div>
          <div>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="border-b-0 border-l px-4 py-2 text-sm"
            />
          </div>
        </div>
        <InifiniteList
          queryKey={["blogs", category.name]}
          queryFn={queryFn}
          renderItem={(blog) => (
            <div key={blog.id} className="mt-2 flex items-center gap-6 text-sm">
              <Checkbox
                checked={blog.categoryId === category.id}
                onCheckedChange={(checked: boolean) => {
                  mutation.mutate({ blogId: blog.id, checked });
                }}
              />
              {blog.title}
            </div>
          )}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
