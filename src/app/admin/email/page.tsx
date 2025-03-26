import AllEmailList from "@/features/newsletter/components/AllEmailList";
import React from "react";

export default function EmailPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string | undefined; q: string | undefined }>;
}) {
  return (
    <div className="space-y-24 px-8 py-12 md:px-24 md:py-28">
      <AllEmailList searchParams={searchParams} />
    </div>
  );
}
