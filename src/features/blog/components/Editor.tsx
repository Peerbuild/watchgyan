"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  EditorCommand,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorInstance,
  EditorRoot,
} from "novel";
import UniqueId from "tiptap-unique-id";
import { PlayflairDisplay } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { defaultExtensions } from "@/lib/extentions";
import { slashCommand, suggestionItems } from "@/lib/suggestions";
import { handleCommandNavigation } from "novel/extensions";
import { Textarea } from "@/components/ui/textarea";
import useAutoSizeTextarea from "@/app/hooks/useAutoSizeTextarea";
import { useEditorMetadata } from "../Providers/EditorMetadataProvider";
import BlogOutline from "./BlogOutline";
import { deleteImage } from "@/features/cloudinary/cloudinary.controller";
import YoutubeUrlDialog from "./YoutubeUrlDialog";
import { generateHTML, Range } from "@tiptap/core";

const TiptapEditor = ({
  setEditor,
}: {
  setEditor: Dispatch<SetStateAction<EditorInstance | null>>;
}) => {
  const [previousImages, setPreviousImages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const { content, setContent } = useEditorMetadata();

  const handleImageDeletion = async (editor: EditorInstance) => {
    if (!editor) return;

    const currentImages: string[] = [];
    editor.getJSON().content?.forEach((node) => {
      if (node.type === "image") {
        currentImages.push(node.attrs?.src);
      }
    });

    const deletedImages = previousImages.filter(
      (url) => !currentImages.includes(url),
    );
    deletedImages.forEach(async function (url) {
      // delete image from cloudinary
      console.log("Deleting image from cloudinary", url);
      await deleteImage(url);
    });

    setPreviousImages(currentImages);
  };

  return (
    <EditorRoot>
      <EditorContent
        immediatelyRender={false}
        extensions={[
          ...defaultExtensions,
          slashCommand,
          UniqueId.configure({
            attributeName: "id",
            types: ["heading"],
          }),
        ]}
        onCreate={({ editor }) => {
          setEditor(editor);
        }}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `BlogContent`,
          },
        }}
        initialContent={content}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          console.log(
            generateHTML(json, [
              ...defaultExtensions,
              slashCommand,
              UniqueId.configure({
                attributeName: "id",
                types: ["heading"],
              }),
            ]),
          );
          setContent(json);
          handleImageDeletion(editor);
        }}
      >
        <YoutubeUrlDialog open={open} setOpen={setOpen} />
        <EditorCommand className="rounded-sm bg-background p-2 shadow-[-20px_20px_50px_-8px_var(--tw-shadow-color)] shadow-muted-foreground/50">
          <EditorCommandList>
            {suggestionItems.map((item) => {
              const command =
                item.title === "Youtube"
                  ? ({
                      editor,
                      range,
                    }: {
                      editor: EditorInstance;
                      range: Range;
                    }) => {
                      console.log("Youtube command");
                      setOpen(true);
                      editor.chain().focus().deleteRange(range).run();
                    }
                  : item.command;
              return (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => command && command(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              );
            })}
          </EditorCommandList>
        </EditorCommand>
      </EditorContent>
    </EditorRoot>
  );
};

export const Editor = () => {
  const subtitleInputRef = React.useRef<HTMLTextAreaElement>(null);
  const titleInputRef = React.useRef<HTMLTextAreaElement>(null);
  const [editor, setEditor] = useState<EditorInstance | null>(null);

  const { title, setTitle, subtitle, setSubtitle, content } =
    useEditorMetadata();

  const [showSubtitle, setShowSubtitle] = useState(false);

  useAutoSizeTextarea({ value: subtitle, textareaRef: subtitleInputRef });
  useAutoSizeTextarea({ value: title, textareaRef: titleInputRef });

  useEffect(() => {
    if (showSubtitle) {
      subtitleInputRef.current?.focus();
    }
  }, [showSubtitle]);

  return (
    <div className="flex flex-row-reverse">
      <BlogOutline content={content ?? ""} />
      <div className="flex-1 space-y-6 overflow-auto">
        <div className="relative flex items-center gap-4">
          <div
            className={cn(
              "text-base w-20 border-r-2 p-2 text-right text-muted-foreground opacity-0 transition-opacity",
              title && "opacity-100",
            )}
          >
            Title
          </div>
          <Textarea
            ref={titleInputRef}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && title) {
                e.preventDefault();
                subtitleInputRef.current?.focus();
                setShowSubtitle(true);
              }
            }}
            className={`ml- 1 resize-none border-none shadow-none focus-visible:ring-0 md:text-h1 ${PlayflairDisplay.className} h-fit p-0`}
            placeholder="Title"
          />
        </div>
        {showSubtitle && (
          <div className="relative flex items-center gap-4">
            <div
              className={cn(
                "text-base w-20 border-r-2 p-2 text-right text-muted-foreground opacity-0 transition-opacity",
                subtitle && "opacity-100",
              )}
            >
              Subtitle
            </div>
            <Textarea
              ref={subtitleInputRef}
              value={subtitle}
              rows={1}
              onChange={(e) => setSubtitle(e.target.value)}
              className={`md:text-lg ml-1 resize-none border-none p-0 text-muted-foreground shadow-none focus-visible:ring-0`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!subtitle) {
                    setShowSubtitle(false);
                  }
                  e.preventDefault();
                  editor?.view.dom.focus();
                }
              }}
              placeholder="Subtitle"
            />
          </div>
        )}
        <TiptapEditor setEditor={setEditor} />
      </div>
    </div>
  );
};
