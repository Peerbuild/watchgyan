import React from "react";
import BlogCard from "./BlogCard";
import { getRecentBlogs } from "../interface/blog.controller";
import { Blog } from "@prisma/client";

function RecentBlogsSmall({ blogs }: { blogs: Blog[] }) {
  return (
    <section className="space-y-5">
      <h2 className="text-caps2 uppercase">Recent Publishes</h2>
      <div className="space-y-2">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} size="small" blog={blog} />
        ))}
      </div>
    </section>
  );
}

function RecentBlogsLarge({ blogs }: { blogs: Blog[] }) {
  return (
    <section className="mx-auto max-w-screen-xl space-y-16 px-6">
      <h2 className="text-center font-serif text-h3 md:text-h2">
        Recent Stories
      </h2>
      <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}

export default async function RecentBlogs({
  size = "large",
}: {
  size?: "large" | "small";
}) {
  const { blogs: recentBlogs } = await getRecentBlogs({
    limit: 3,
  });

  if (size === "large") {
    return <RecentBlogsLarge blogs={recentBlogs} />;
  }

  return <RecentBlogsSmall blogs={recentBlogs} />;
}
