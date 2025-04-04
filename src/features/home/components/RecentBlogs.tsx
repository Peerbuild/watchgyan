import BlogCard from "@/features/blog/components/BlogCard";
import { getRecentBlogs } from "@/features/blog/interface/blog.controller";
import React from "react";
import SectionTitle from "./SectionTitle";
import Link from "next/link";
import Animate from "@/components/Animate";
import AnimatedButton from "./AnimatedButton";

export default async function RecentBlogs() {
  const { blogs: recentBlogs } = await getRecentBlogs({
    limit: 3,
  });

  return (
    <section className="mx-auto max-w-screen-xl px-6 text-center">
      <Animate className="space-y-12 lg:space-y-24">
        <SectionTitle
          title="Global Stories for You to Binge on"
          subtitle="Blogs & Stories"
        />
        <div className="grid grid-cols-1 gap-10 text-foreground sm:grid-cols-2 lg:grid-cols-3">
          {recentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        <Link href={"/blog"} className="relative z-20 block">
          <AnimatedButton>Explore all blogs</AnimatedButton>
        </Link>
      </Animate>
    </section>
  );
}
