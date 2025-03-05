import { Blog } from "@prisma/client";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCardLarge = ({ blog }: { blog: Blog }) => {
  const tag = blog.tags[0];
  return (
    <Link href={`/blog/${blog.id}/${blog.slug}`} className="flex-1">
      <article className="space-y-4 text-left">
        <div className="aspect-video w-full overflow-hidden">
          {blog.thumbnail ? (
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              className="h-full w-full object-cover"
              width={300}
              height={250}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <FeatherIcon icon="image" className="text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold text-foreground duration-500">
            {blog.title}
          </h3>
          <p className="text-md text-foreground duration-500">
            {blog.description}
          </p>
        </div>

        <div className="flex gap-3 text-sm text-muted-foreground">
          <div>3 Min</div>
          {tag && <div>{tag}</div>}
        </div>
      </article>
    </Link>
  );
};

const BlogCardSmall = ({ blog }: { blog: Blog }) => {
  return (
    <Link href={`/blog/${blog.id}/${blog.slug}`} className="flex-1">
      <article className="flex gap-2 text-left">
        <div className="aspect-video w-full max-w-24 overflow-hidden">
          {blog.thumbnail ? (
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              className="h-full w-full object-cover"
              width={300}
              height={250}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <FeatherIcon icon="image" className="text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-md">{blog.title}</h3>
          <p className="text-sm text-muted-foreground">{blog.description}</p>
        </div>
      </article>
    </Link>
  );
};

const BlogCard = ({
  blog,
  size = "large",
}: {
  blog: Blog;
  size?: "small" | "large";
}) => {
  if (size === "small") {
    return <BlogCardSmall blog={blog} />;
  }

  return <BlogCardLarge blog={blog} />;
};

export default BlogCard;
