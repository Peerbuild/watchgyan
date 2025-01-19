import AutoSizeTextarea from '@/components/AutoSizeTextarea';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import { useEditorMetadata } from '../Providers/EditorMetadataProvider';
import { createBlog } from '../interface/blog.controller';
import { generateHTML } from '@tiptap/core';
import { defaultExtensions } from '@/lib/extentions';
import { slashCommand } from '@/lib/suggestions';
import { toast } from 'sonner';
import { cn, isEditorContentEmpty, uploadMedia } from '@/lib/utils';
import Image from 'next/image';

const BlogPublishDialog = () => {
  const { title, subtitle, content } = useEditorMetadata();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [values, setValues] = useState({
    title: '',
    subtitle: '',
    tags: '',
    thumbnail: '',
    content,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      console.log(isEditorContentEmpty(values.content), values.title);
      if (isEditorContentEmpty(values.content) || !values.title) return;

      const html = generateHTML(values.content!, [
        ...defaultExtensions,
        slashCommand,
      ]);

      const tags = values.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');

      return await createBlog({
        ...values,
        content: html,
        tags,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {},
  });

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      title,
      subtitle,
      content,
    }));
  }, [title, subtitle, content]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsImageUploading(true);
      const result = await uploadMedia(file);
      console.log(result);
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
    <DialogContent className="h-full max-w-none data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 sm:rounded-none">
      <DialogTitle hidden>Publish Blog</DialogTitle>
      <div className="mx-auto flex max-w-screen-lg justify-center gap-16 self-center">
        <div className="flex-1 space-y-4">
          <h2 className="font-serif text-md font-semibold">Story Preview</h2>
          <label
            htmlFor="thumbnail"
            className={cn(
              'flex aspect-video w-[30rem] cursor-pointer items-center justify-center bg-muted',
              isImageUploading && 'animate-pulse',
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
              <span className="w-64 text-center text-muted-foreground">
                {isImageUploading
                  ? 'Uploading Thumbnail'
                  : 'Add a thumbnail to give readers a quick prevew of your post.'}
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
            className="border-b font-serif text-md font-semibold"
          />
          <AutoSizeTextarea
            value={values.subtitle}
            onChange={(e) => {
              setValues({
                ...values,
                subtitle: e.target.value,
              });
            }}
            className="border-b"
            placeholder="Enter a breif subtitle"
          />
        </div>
        <div className="flex-1 space-y-4">
          <h2 className="font-serif text-md font-semibold">Tags</h2>
          <p>
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
            className="resize-none border-none bg-muted px-4 py-3"
          />
          <div>
            <Button
              className="uppercase"
              onClick={() => {
                mutation.mutate();
              }}
            >
              Publish Now
            </Button>
            <Button variant={'ghost'}>Save as Draft</Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default BlogPublishDialog;
