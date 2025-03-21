import { getBlogsByCategory } from "@/features/category/interface/category.controller";
import React from "react";
import BlogCard from "./BlogCard";

export default async function CuratedPicks() {
  const curatedPicks = await getBlogsByCategory({
    categoryName: "Curated Picks",
    limit: 6,
  });

  return (
    <section className="mx-auto max-w-screen-xl space-y-16">
      <h2 className="text-center font-serif text-h2">Curated Picks</h2>
      <div className="grid grid-cols-3 gap-16">
        {curatedPicks.map((article) => (
          <BlogCard blog={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}
