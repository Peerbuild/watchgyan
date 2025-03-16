"use client";

import UniqueId from "tiptap-unique-id";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import { deleteBlog, updateBlog } from "../interface/blog.controller";
import { DeleteBlogRequest } from "../dto/deleteBlog.dto";
import { toast } from "sonner";
import { deleteImage } from "@/features/cloudinary/cloudinary.controller";
import { generateJSON, JSONContent } from "@tiptap/core";
import { defaultExtensions } from "@/lib/extentions";
import { slashCommand } from "@/lib/suggestions";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Switch } from "@/components/ui/switch";

export function DeleteBlogButton({ id }: { id: string }) {
  const mutation = useMutation({
    mutationFn: async (data: DeleteBlogRequest) => {
      const blog = await deleteBlog(data);

      const contentJson = generateJSON(blog.content, [
        ...defaultExtensions,
        slashCommand,
        UniqueId.configure({
          attributeName: "id",
          types: ["heading"],
        }),
      ]);

      const images: string[] = contentJson.content
        .filter((node: JSONContent) => node.type === "image")
        .map((node: JSONContent) => node.attrs?.src);

      if (blog.thumbnail) {
        images.push(blog.thumbnail);
      }
      console.log(images);

      const deleteImagePromises = images.map((image) => deleteImage(image));
      await Promise.all(deleteImagePromises);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Blog deleted successfully");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <FeatherIcon icon="trash" className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-sub font-bold">
            Are you sure?
          </DialogTitle>
        </DialogHeader>
        <p>
          This action <span className="font-semibold uppercase">cannot</span> be
          undone. This will permanently delete the blog and all its content. Are
          you sure you want to delete this blog permanently?
        </p>
        <DialogFooter>
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={() => {
              mutation.mutate({ id });
            }}
          >
            Yes I&apos;m sure, delete this blog
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TogglePublishButton({
  id,
  isPublished,
}: {
  id: string;
  isPublished: boolean;
}) {
  const mutation = useMutation({
    mutationFn: async () => {
      return await updateBlog({ id, isPublished: !isPublished });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(
        `Blog ${isPublished ? "unpublished" : "published"} successfully`,
      );
    },
  });

  return (
    <Switch checked={isPublished} onCheckedChange={() => mutation.mutate()} />
  );
}
