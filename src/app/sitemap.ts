import { getAllBlogs } from "@/features/blog/interface/blog.controller";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blogs } = await getAllBlogs({
    limit: 100,
  });

  const sitemap: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `https://watchgyan.co.in/blog/${blog.id}/${blog.slug}`,
    lastModified: blog.updatedAt,
  }));

  return sitemap;
}
