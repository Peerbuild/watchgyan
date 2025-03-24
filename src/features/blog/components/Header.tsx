"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import BlogPublishDialog from "./BlogPublishDialog";
import { useEditorMetadata } from "../Providers/EditorMetadataProvider";
import { isEditorContentEmpty } from "@/lib/utils";
import Link from "next/link";

export default function EditorHeader() {
  const { title, content, id } = useEditorMetadata();

  return (
    <header className="flex items-center justify-end gap-4 px-12 py-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            disabled={!title || isEditorContentEmpty(content)}
          >
            PUBLISH
          </Button>
        </DialogTrigger>
        <BlogPublishDialog />
      </Dialog>
      <Link href={`/blog/${id}`}>
        <Button variant={"ghost"} className="uppercase">
          PREVIEW
        </Button>
      </Link>
    </header>
  );
}
