"use client";
import React, { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useHighlightHeading from "../hooks/useHighlightHeading";
import { cn } from "@/lib/utils";

interface BlogOutlineProps {
  content: string | JSONContent;
}

const BlogOutline = ({ content }: BlogOutlineProps) => {
  const path = usePathname();
  const [headings, setHeadings] = useState<
    | {
        id: string;
        text: string;
      }[]
    | []
  >([]);
  const { activeId } = useHighlightHeading({
    content,
  });

  useEffect(() => {
    const editorContent = document.querySelector(".BlogContent");
    if (!editorContent) {
      return;
    }
    const elements = Array.from(editorContent.querySelectorAll("h1")).map(
      (elem) => {
        return {
          id: elem.id,
          text: elem.innerText,
        };
      },
    );

    setHeadings(elements);
  }, [content]);

  return (
    <div className="w-40">
      <ul className="sticky top-0 space-y-2">
        {headings.map((heading) => {
          return (
            <Link
              href={`${path}#${heading.id}`}
              key={heading.id}
              className="block"
            >
              <li
                className={cn(
                  "break-words text-right text-muted-foreground",
                  activeId === heading.id && "text-primary",
                )}
              >
                {heading.text}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default BlogOutline;
