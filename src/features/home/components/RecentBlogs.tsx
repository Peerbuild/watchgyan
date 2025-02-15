import BlogCard from '@/features/blog/components/BlogCard';
import { getRecentBlogs } from '@/features/blog/interface/blog.controller';
import React from 'react';
import SectionTitle from './SectionTitle';
import { Button } from '@/components/ui/button';

export default async function RecentBlogs() {
  const recentBlogs = await getRecentBlogs();

  return (
    <section className="mx-auto max-w-screen-xl space-y-16 text-center">
      <SectionTitle
        title="Global Stories for You to Binge on"
        subtitle="Blogs & Stories"
      />
      <div className="grid grid-cols-3 gap-16">
        {recentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <Button variant={'outline'}>View More</Button>
    </section>
  );
}
