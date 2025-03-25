import { Blog } from "@prisma/client";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DeleteBlogButton,
  EditBlogButton,
  TogglePublishButton,
} from "./BlogActions";

const BlogCardLarge = ({ blog }: { blog: Blog }) => {
  const tag = blog.tags[0];
  const readingTime = Math.ceil(blog.words / 200);

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
            <div className="flex h-full w-full items-center justify-center bg-muted transition-colors duration-500">
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
          <div>{readingTime} mins</div>
          {tag && <div>{tag}</div>}
        </div>
      </article>
    </Link>
  );
};

const BlogCardMedium = ({ blog }: { blog: Blog }) => {
  return (
    <Link href={`/blog/${blog.id}/${blog.slug}`} className="flex-1">
      <article className="flex gap-2 text-left">
        <div className="aspect-video w-full max-w-28 overflow-hidden">
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
          <h3 className="text-sm">{blog.title}</h3>
          <p className="text-sm text-muted-foreground">{blog.description}</p>
        </div>
      </article>
    </Link>
  );
};

const BlogCardSmall = ({
  blog,
  showActions,
}: {
  blog: Blog;
  showActions?: {
    publish?: boolean;
    delete?: boolean;
    edit?: boolean;
  };
}) => {
  const {
    publish = true,
    delete: deleteAction = true,
    edit = true,
  } = showActions || {};

  const isDraft = blog.isDraft;
  const url = isDraft
    ? `/admin/blog/write/${blog.id}`
    : `/blog/${blog.id}/${blog.slug}`;

  return (
    <article className="relative flex items-center gap-6 p-4 text-left shadow-md">
      <div>
        <FeatherIcon icon="book-open" className="size-5" />
      </div>

      <Link href={url} className="flex-1">
        <span className="absolute inset-0"></span>
        <h3>{blog.title}</h3>
      </Link>

      <div className="relative z-20 flex items-center gap-6">
        {edit && <EditBlogButton id={blog.id} />}
        {publish && (
          <TogglePublishButton id={blog.id} isPublished={blog.isPublished} />
        )}
        {deleteAction && <DeleteBlogButton id={blog.id} />}
      </div>
    </article>
  );
};

const BlogCard = ({
  blog,
  size = "large",
  showActions,
}: {
  blog: Blog;
  size?: "small" | "large" | "medium";
  showActions?: {
    publish?: boolean;
    delete?: boolean;
  };
}) => {
  switch (size) {
    case "small":
      return <BlogCardSmall blog={blog} showActions={showActions} />;
    case "medium":
      return <BlogCardMedium blog={blog} />;
    default:
      return <BlogCardLarge blog={blog} />;
  }
};

export default BlogCard;
