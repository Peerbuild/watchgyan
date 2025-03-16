import { buttonVariants } from "@/components/ui/button";
import FeatherIcon from "feather-icons-react";
import React from "react";
import { getDraftBlogs } from "../interface/blog.controller";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function DraftBlogs() {
  const draftBlogs = await getDraftBlogs();

  return (
    <section className="space-y-5">
      <h2 className="text-caps2 uppercase">Drafts</h2>
      <div>
        <Link
          href={"/admin/blog/write"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-14 w-full shadow-md",
          )}
        >
          <FeatherIcon icon="plus" />
          Write a new blog
        </Link>
      </div>
      <div>
        {draftBlogs.map((blog) => {
          return (
            <BlogCard
              key={blog.id}
              size="small"
              blog={blog}
              showActions={{
                publish: false,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
