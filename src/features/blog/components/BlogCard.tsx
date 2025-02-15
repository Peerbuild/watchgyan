import { Blog } from '@prisma/client';
import FeatherIcon from 'feather-icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogCard = ({ blog }: { blog: Blog }) => {
  const tag = blog.tags[0];
  return (
    <Link href={`/blog/${blog.id}/${blog.slug}`} className="flex-1">
      <article className="max-w-sm space-y-4 text-left">
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
          <h3 className="font-semibold">{blog.title}</h3>
          <p className="text-md">{blog.description}</p>
        </div>

        <div className="flex gap-3 text-sm text-muted-foreground">
          <div>3 Min</div>
          {tag && <div>{tag}</div>}
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
