import React from "react";
import { getTopBlogs } from "../interface/blog.controller";
import BlogCard from "./BlogCard";

export default async function TopArticles() {
  const topArticles = await getTopBlogs();

  return (
    <section className="mx-auto max-w-screen-xl space-y-16 px-6">
      <h2 className="text-center font-serif text-h3 md:text-h2">
        Top Articles
      </h2>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        {topArticles.map((article) => (
          <BlogCard blog={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}
