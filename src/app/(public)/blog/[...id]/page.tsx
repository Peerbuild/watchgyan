import { getBlogById } from '@/features/blog/interface/blog.controller';
import { JSDOM } from 'jsdom';
import DomPurify from 'dompurify';
import { Blog } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const { id } = await params;
  const [blogId] = id;

  const blog = await getBlogById(blogId);

  return (
    <div className="flex flex-row-reverse">
      <div className="w-40"></div>
      <div className="mx-auto max-w-screen-md space-y-10 py-14">
        <div className="space-y-6">
          <h1 className="font-serif text-2xl">{blog.title}</h1>
          <p className="text-lg font-light">{blog.subtitle}</p>
        </div>
        <Image
          src={blog.thumbnail || ''}
          alt={blog.title}
          width={800}
          height={600}
        />
        <BlogContent content={blog.content} />
      </div>
    </div>
  );
}

const BlogContent = ({ content }: { content: Blog['content'] }) => {
  const window = new JSDOM('').window;
  const DOMPurifyServer = DomPurify(window);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurifyServer.sanitize(content),
      }}
    ></div>
  );
};
