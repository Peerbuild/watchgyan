import DraftBlogs from "@/features/blog/components/DraftBlogs";
import RecentBlogs from "@/features/blog/components/RecentBlogs";
import RecentEmails from "@/features/newsletter/components/RecentEmails";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Glance() {
  return (
    <div className="space-y-24 px-8 py-12 md:px-24 md:py-28">
      <Suspense>
        <DraftBlogs />
      </Suspense>
      <Suspense>
        <RecentBlogs size="small" />
      </Suspense>
      <Suspense>
        <RecentEmails />
      </Suspense>
    </div>
  );
}
