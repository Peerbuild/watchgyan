"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@prisma/client";
import FeatherIcon from "feather-icons-react";
import InifiniteList from "./InifiniteList";
import { Checkbox } from "@/components/ui/checkbox";
import {
  addBlogToCategory,
  getBlogsWithCategory,
  removeBlogFromCategory,
  searchBlogsInCategory,
} from "../interface/category.controller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";

interface BlogSelectorMenuProps {
  category: Category;
}

export default function BlogSelectorMenu({ category }: BlogSelectorMenuProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Local optimistic update store
  const [localChanges, setLocalChanges] = useState<Record<string, boolean>>({});

  const queryClient = useQueryClient();

  // Query function switches depending on search
  const queryFn = search
    ? async ({ pageParam }: { pageParam: number }) => {
        const blogs = await searchBlogsInCategory({
          categoryId: category.id,
          query: debouncedSearch,
          limit: 10,
          offset: pageParam * 10,
        });

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
        return {
          items: blogs.blogs,
          totalItems: blogs.totalBlogs,
        };
      };

  const mutation = useMutation({
    mutationFn: async ({
      blogId,
      checked,
    }: {
      blogId: string;
      checked: boolean;
    }) => {
      // Optimistic local update
      setLocalChanges((prev) => ({
        ...prev,
        [blogId]: checked,
      }));

      if (checked) {
        return await addBlogToCategory({
          categoryId: category.id,
          blogId,
        });
      } else {
        return await removeBlogFromCategory({
          categoryId: category.id,
          blogId,
        });
      }
    },
    onError: (error, variables) => {
      console.error(error);
      // revert if API failed
      setLocalChanges((prev) => {
        const updated = { ...prev };
        delete updated[variables.blogId];
        return updated;
      });
    },
    onSettled: () => {
      // Invalidate the correct query key based on search
      queryClient.invalidateQueries({
        queryKey: ["blogs", category.name, debouncedSearch || ""],
      });
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["blogs", category.name, debouncedSearch || ""],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, category.name]);

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
        className="space-y-2 rounded-none p-4 pt-2"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="text-nowrap text-caps3 uppercase text-muted-foreground">
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
          queryKey={["blogs", category.name, debouncedSearch || ""]}
          queryFn={queryFn}
          renderItem={(blog) => {
            // Merge local changes with server state for instant UI feedback
            const finalChecked =
              localChanges[blog.id] !== undefined
                ? localChanges[blog.id]
                : blog.categoryIds.includes(category.id);

            return (
              <div key={blog.id} className="flex items-center gap-6 text-sm">
                <Checkbox
                  checked={finalChecked}
                  onCheckedChange={(checked: boolean) => {
                    mutation.mutate({ blogId: blog.id, checked });
                  }}
                />
                {blog.title}
              </div>
            );
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
