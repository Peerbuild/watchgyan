import AllBlogs from "@/features/blog/components/AllBlogs";
import BlogSelection from "@/features/category/components/BlogSelection";
import DraftBlogs from "@/features/blog/components/DraftBlogs";
import React, { Suspense } from "react";

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string | undefined; q: string | undefined }>;
}) {
  return (
    <div className="space-y-24 px-8 py-12 md:px-24 md:py-28">
      <DraftBlogs />
      <BlogSelection />
      <Suspense>
        <AllBlogs searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
