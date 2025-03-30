import { getBlogsByCategory } from "@/features/category/interface/category.controller";
import React from "react";
import BlogCard from "./BlogCard";

export default async function CuratedPicks() {
  const curatedPicks = await getBlogsByCategory({
    categoryName: "Curated Picks",
    limit: 6,
  });

  return (
    <section id="picks" className="mx-auto max-w-screen-xl space-y-16">
      <h2 className="text-center font-serif text-h3 text-foreground transition-colors duration-500 md:text-h2">
        Curated Picks
      </h2>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        {curatedPicks.map((article) => (
          <BlogCard blog={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}
