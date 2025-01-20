import { Blog } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link href={`/blog/${blog.id}/${blog.slug}`}>
      <article className="max-w-sm space-y-3">
        <div className="aspect-video overflow-hidden">
          <Image
            src={blog.thumbnail ?? ''}
            alt={blog.title}
            className="h-full w-full object-cover"
            width={300}
            height={250}
          />
        </div>

        <div className="space-y-1">
          <h3 className="font-serif font-semibold">{blog.title}</h3>
          <p className="text-sm font-light">
            {blog.subtitle || 'This is a subtitle'}
          </p>
        </div>

        <div className="text-xs flex gap-3 font-medium">
          <div>3 Min</div>
          <div>History</div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
