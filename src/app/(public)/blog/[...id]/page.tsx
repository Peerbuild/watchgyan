import "@/features/blog/styles/style.css";
import {
  getBlogById,
  getRecentBlogs,
} from "@/features/blog/interface/blog.controller";
import { JSDOM } from "jsdom";
import DomPurify from "dompurify";
import { Blog } from "@prisma/client";
import Image from "next/image";
import React from "react";
import BlogOutline from "@/features/blog/components/BlogOutline";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Footer from "@/features/home/components/Footer";
import LatestGlobalBlogs from "@/features/blog/components/LatestGlobalBlogs";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string[] }>;
};

export async function generateStaticParams() {
  const { blogs } = await getRecentBlogs({
    limit: 50,
  });

  return blogs.map((blog) => ({
    id: [blog.id, blog.slug],
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const [blogId] = id;

  const blog = await getBlogById(blogId);

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://watchgyan.com/blog/${blogId}/${blog.slug}`,
      images: blog.thumbnail
        ? [
            {
              url: blog.thumbnail,
              width: 800,
              height: 450,
              alt: blog.title,
            },
          ]
        : [],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { id } = await params;
  const [blogId, slug] = id;

  const blog = await getBlogById(blogId);

  if (!blog) {
    return notFound();
  }

  if (!blog.isPublished) {
    const session = await auth();

    if (!session) {
      return notFound();
    }
  }

  if (!slug || decodeURIComponent(slug) !== blog.slug) {
    return redirect(`/blog/${blogId}/${blog.slug}`);
  }

  return (
    <div>
      <div className="mx-auto mt-32 flex max-w-screen-xl flex-row-reverse justify-between gap-48 px-6 md:py-14">
        <BlogOutline content={blog.content} />
        <div className="mx-auto w-full max-w-[65ch] space-y-10">
          <div className="space-y-6">
            <h1 className="font-serif text-h1">{blog.title}</h1>
            <p className="text-h3 font-light">{blog.subtitle}</p>
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
      <LatestGlobalBlogs />
      <Footer />
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
