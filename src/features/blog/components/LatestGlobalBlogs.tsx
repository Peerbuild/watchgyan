import React from "react";
import BlogCardCarousel from "./BlogCardCarousel";
import { getBlogsByCategory } from "@/features/category/interface/category.controller";

export default async function LatestGlobalBlogs() {
  const blogs = await getBlogsByCategory({
    categoryName: "Latest Global Stories",
  });

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-screen-2xl overflow-visible pl-9 md:px-12">
        <BlogCardCarousel blogs={blogs} />
      </div>
    </section>
  );
}
