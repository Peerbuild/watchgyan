import React from 'react';
import '@/features/blog/styles/style.css';
import { Editor } from '@/features/blog/components/Editor';

export default function EditorPage() {
  return (
    <div className="mx-auto mb-40 mt-20 max-w-screen-xl px-20">
      <Editor />
    </div>
  );
}
