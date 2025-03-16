import AllBlogs from "@/features/blog/components/AllBlogs";
import DraftBlogs from "@/features/blog/components/DraftBlogs";
import React from "react";

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string | undefined }>;
}) {
  return (
    <div className="space-y-24 px-24 py-28">
      <DraftBlogs />
      <AllBlogs searchParams={searchParams} />
    </div>
  );
}
