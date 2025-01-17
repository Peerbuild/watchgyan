import React from 'react';
import './style.css';
import { Editor } from '@/features/blog/components/Editor';

export default function EditorPage() {
  return (
    <div className="mx-auto max-w-screen-md pt-20">
      <Editor />
    </div>
  );
}
