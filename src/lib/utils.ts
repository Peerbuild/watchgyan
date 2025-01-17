import { clsx, type ClassValue } from 'clsx';
import { JSONContent } from 'novel';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEditorContentEmpty(content: JSONContent | undefined) {
  return (
    content === undefined || !content.content || !content.content[0].content
  );
}
