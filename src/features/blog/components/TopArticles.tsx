import React from 'react';
import { getTopBlogs } from '../interface/blog.controller';
import BlogCard from './BlogCard';

export default async function TopArticles() {
  const topArticles = await getTopBlogs();

  return (
    <section className="mx-auto max-w-screen-xl space-y-16">
      <h2 className="text-h1 text-center font-serif">Top Articles</h2>
      <div className="grid grid-cols-3 gap-16">
        {topArticles.map((article) => (
          <BlogCard blog={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}
