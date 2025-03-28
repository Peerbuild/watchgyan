import React from "react";
import { getDraftBlogs } from "../interface/blog.controller";
import BlogCard from "./BlogCard";
import WriteBlogBtn from "./WriteBlogBtn";

export default async function DraftBlogs() {
  const draftBlogs = await getDraftBlogs();

  return (
    <section className="space-y-5">
      <h2 className="text-caps2 uppercase">Drafts</h2>
      <div>
        <WriteBlogBtn />
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
