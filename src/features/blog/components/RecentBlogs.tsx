import React from 'react';
import BlogCard from './BlogCard';
import { getRecentBlogs } from '../interface/blog.controller';

export default async function RecentBlogs() {
  const recentBlogs = await getRecentBlogs();

  return (
    <section className="mx-auto w-fit space-y-16">
      <h2 className="text-center font-serif text-2xl">Recent Stories</h2>
      <div className="flex gap-16">
        {recentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
