import AllEmailList from "@/features/newsletter/components/AllEmailList";
import React from "react";

export default function EmailPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string | undefined; q: string | undefined }>;
}) {
  return (
    <div className="space-y-24 px-24 py-28">
      <AllEmailList searchParams={searchParams} />
    </div>
  );
}
