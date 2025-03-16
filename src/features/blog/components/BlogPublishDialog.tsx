import AutoSizeTextarea from "@/components/AutoSizeTextarea";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import UniqueId from "tiptap-unique-id";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useEditorMetadata } from "../Providers/EditorMetadataProvider";
import { createBlog, publishBlog } from "../interface/blog.controller";
import { generateHTML } from "@tiptap/core";
import { defaultExtensions } from "@/lib/extentions";
import { slashCommand } from "@/lib/suggestions";
import { toast } from "sonner";
import { cn, isEditorContentEmpty, uploadMedia } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BlogPublishDialog = () => {
  const { title, subtitle, content } = useEditorMetadata();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    subtitle: "",
    description: "",
    tags: "",
    thumbnail: "",
    content,
  });
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      console.log(isEditorContentEmpty(values.content), values.title);
      if (
        isEditorContentEmpty(values.content) ||
        !values.title ||
        !values.description
      ) {
        throw new Error("Title and Description are required");
      }

      const html = generateHTML(values.content!, [
        ...defaultExtensions,
        slashCommand,
        UniqueId.configure({
          attributeName: "id",
          types: ["heading"],
        }),
      ]);

      const tags = values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const blog = await createBlog({
        ...values,
        content: html,
        tags,
      });

      return await publishBlog({
        id: blog.id,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      router.push(`/blog/${data.id}/${data.slug}`);
    },
  });

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      title,
      subtitle,
      description: subtitle,
      content,
    }));
  }, [title, subtitle, content]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsImageUploading(true);
      const result = await uploadMedia(file);
      setValues({
        ...values,
        thumbnail: result.secure_url,
      });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsImageUploading(false);
    }
  };

  return (
    <DialogContent className="h-full max-w-none transition-none data-[state=closed]:!animate-none data-[state=open]:!animate-none sm:rounded-none">
      <DialogTitle hidden>Publish Blog</DialogTitle>
      <div className="mx-auto flex max-w-screen-lg justify-center gap-16 self-center">
        <div className="flex-1 space-y-4">
          <h2 className="font-serif font-semibold">Story Preview</h2>
          <label
            htmlFor="thumbnail"
            className={cn(
              "flex aspect-video w-[30rem] cursor-pointer items-center justify-center bg-muted",
              isImageUploading && "animate-pulse",
            )}
          >
            {values.thumbnail ? (
              <Image
                src={values.thumbnail}
                alt="Blog Thumbnail"
                width={400}
                height={300}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="w-64 text-center text-md text-muted-foreground">
                {isImageUploading
                  ? "Uploading Thumbnail"
                  : "Add a thumbnail to give readers a quick prevew of your post."}
              </span>
            )}
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            name="thumbnail"
            id="thumbnail"
            hidden
          />
          <AutoSizeTextarea
            value={values.title}
            onChange={(e) => {
              setValues({
                ...values,
                title: e.target.value,
              });
            }}
            placeholder="Enter a post title"
            className="border-b font-serif text-body font-semibold"
          />
          <AutoSizeTextarea
            value={values.description}
            onChange={(e) => {
              setValues({
                ...values,
                description: e.target.value,
              });
            }}
            className="border-b text-md"
            placeholder="Enter a breif description"
          />
        </div>
        <div className="flex-1 space-y-4">
          <h2 className="font-serif font-semibold">Tags</h2>
          <p className="text-md">
            Add a topic to your post so that readers get an idea about the story
          </p>
          <Textarea
            rows={6}
            value={values.tags}
            onChange={(e) =>
              setValues({
                ...values,
                tags: e.target.value,
              })
            }
            placeholder="Add a topic..."
            className="resize-none rounded-none border-none bg-muted px-4 py-3 text-md"
          />
          <div className="space-x-2">
            <Button
              className="uppercase"
              onClick={() => {
                mutation.mutate();
              }}
            >
              Publish Now
            </Button>
            <DialogClose asChild>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default BlogPublishDialog;
