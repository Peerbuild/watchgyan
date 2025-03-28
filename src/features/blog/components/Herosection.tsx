import React from "react";
import FeaturedPostCarousel from "./FeaturedPostCarousel";
import { getBlogsByCategory } from "@/features/category/interface/category.controller";

const Herosection = async () => {
  const featuredPosts = await getBlogsByCategory({
    categoryName: "Featured Posts",
    limit: 5,
  });

  return (
    <section className="dark relative mx-auto flex min-h-svh items-center space-y-8 bg-background py-32 text-foreground">
      <FeaturedPostCarousel blogs={featuredPosts} />
    </section>
  );
};

export default Herosection;
