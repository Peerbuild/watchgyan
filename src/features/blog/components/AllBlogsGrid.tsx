import React from "react";
import { getAllBlogs } from "../interface/blog.controller";
import BlogCard from "./BlogCard";

export default async function AllBlogsGrid() {
  const allBlogs = await getAllBlogs({
    limit: 100,
  });

  return (
    <section id="all-blogs" className="mx-auto max-w-screen-xl space-y-16 px-6">
      <h2 className="text-center font-serif text-h3 text-foreground transition-colors duration-500 md:text-h2">
        All Blogs
      </h2>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        {allBlogs.blogs.map((article) => (
          <BlogCard blog={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}
