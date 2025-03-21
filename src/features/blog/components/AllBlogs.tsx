import React from "react";
import { getRecentBlogs, searchBlogs } from "../interface/blog.controller";
import BlogCard from "./BlogCard";
import Pagination from "@/components/Pagination";
import { Search } from "@/components/Search";

const BLOGS_PER_PAGE = 7;

export default async function AllBlogs({
  searchParams,
}: {
  searchParams: Promise<{
    page: string | undefined;
    q: string | undefined;
  }>;
}) {
  const { page, q } = await searchParams;
  const currentPage = page ? Number(page) : 1;
  const offset = (Number(currentPage) - 1) * BLOGS_PER_PAGE;

  const { blogs, totalBlogs } = q
    ? await searchBlogs({
        query: q,
        limit: BLOGS_PER_PAGE,
        offset,
      })
    : await getRecentBlogs({
        limit: BLOGS_PER_PAGE,
        offset,
      });

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-caps2 uppercase">All Blogs</h2>
        <Search />
      </div>
      <div>
        {blogs.map((blog) => {
          return <BlogCard blog={blog} key={blog.id} size="small" />;
        })}
      </div>
      <Pagination
        itemsPerPage={BLOGS_PER_PAGE}
        totalItems={totalBlogs}
        currentPage={currentPage}
      />
    </section>
  );
}
