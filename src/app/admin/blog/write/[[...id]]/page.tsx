import React from "react";
import "@/features/blog/styles/style.css";
import { Editor } from "@/features/blog/components/Editor";
import { getBlogById } from "@/features/blog/interface/blog.controller";
import { redirect } from "next/navigation";

interface EditorPageProps {
  params: Promise<{
    id: string | string[] | undefined;
  }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="mx-auto mb-40 mt-20 max-w-screen-lg">
        <Editor />
      </div>
    );
  }

  const [blogId] = id;

  const blog = id ? await getBlogById(blogId) : null;

  if (!blog) {
    redirect("/admin/blog/write");
  }

  return (
    <div className="mx-auto mb-40 mt-20 max-w-screen-lg">
      <Editor blog={blog} />
    </div>
  );
}
