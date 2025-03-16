import DraftBlogs from "@/features/blog/components/DraftBlogs";
import RecentBlogs from "@/features/blog/components/RecentBlogs";
import RecentEmails from "@/features/newsletter/components/RecentEmails";
import React from "react";

export default function Glance() {
  return (
    <div className="space-y-24 px-24 py-28">
      <DraftBlogs />
      <RecentBlogs size="small" />
      <RecentEmails />
    </div>
  );
}
