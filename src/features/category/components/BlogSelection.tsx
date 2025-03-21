import React from "react";
import { getCategories } from "../interface/category.controller";
import BlogSelectorMenu from "./BlogSelectorMenu";

export default async function BlogSelection() {
  const categories = await getCategories();

  return (
    <section className="space-y-5">
      <h2 className="text-caps2 uppercase">Sections</h2>
      <div className="space-y-2">
        {categories.map(async (category) => {
          return <BlogSelectorMenu category={category} key={category.id} />;
        })}
      </div>
    </section>
  );
}
