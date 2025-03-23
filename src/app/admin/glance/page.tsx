import DraftBlogs from "@/features/blog/components/DraftBlogs";
import RecentBlogs from "@/features/blog/components/RecentBlogs";
import RecentEmails from "@/features/newsletter/components/RecentEmails";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Glance() {
  return (
    <div className="space-y-24 px-24 py-28">
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
