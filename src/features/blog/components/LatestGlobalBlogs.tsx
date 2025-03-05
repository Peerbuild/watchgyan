import React from "react";
import BlogCardCarousel from "./BlogCardCarousel";

export default function LatestGlobalBlogs() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-screen-2xl overflow-visible pl-24">
        <BlogCardCarousel />
      </div>
    </section>
  );
}
