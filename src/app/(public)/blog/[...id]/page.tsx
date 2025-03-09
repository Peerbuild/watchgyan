import "@/features/blog/styles/style.css";
import { getBlogById } from "@/features/blog/interface/blog.controller";
import { JSDOM } from "jsdom";
import DomPurify from "dompurify";
import { Blog } from "@prisma/client";
import Image from "next/image";
import React from "react";
import BlogOutline from "@/features/blog/components/BlogOutline";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const { id } = await params;
  const [blogId] = id;

  const blog = await getBlogById(blogId);

  console.log(blog.content);

  return (
    <div className="mx-auto mt-32 flex max-w-screen-lg flex-row-reverse">
      <BlogOutline content={blog.content} />
      <div className="mx-auto w-full space-y-10 py-14">
        <div className="space-y-6">
          <h1 className="font-serif text-h1">{blog.title}</h1>
          <p className="text-lg font-light">{blog.subtitle}</p>
        </div>
        {blog.thumbnail && (
          <div className="aspect-video w-full overflow-hidden">
            <Image
              src={blog.thumbnail || ""}
              alt={blog.title}
              width={800}
              height={450}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <BlogContent content={blog.content} />
      </div>
    </div>
  );
}

const BlogContent = ({ content }: { content: Blog["content"] }) => {
  const window = new JSDOM("").window;
  const DOMPurifyServer = DomPurify(window);

  const sanitizedContent = DOMPurifyServer.sanitize(content, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });

  return (
    <div
      className="BlogContent"
      dangerouslySetInnerHTML={{
        __html: sanitizedContent,
      }}
    ></div>
  );
};
