'use client';
import { JSONContent } from 'novel';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface EditorMetadataContextProps {
  title: string;
  setTitle: (title: string) => void;
  subtitle: string;
  setSubtitle: (subtitle: string) => void;
  content: JSONContent | undefined;
  setContent: (content: JSONContent) => void;
}

const EditorMetadataContext = createContext<EditorMetadataContextProps | null>(
  null,
);

const EditorMetadataProvider = ({ children }: PropsWithChildren) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState<JSONContent | undefined>(undefined);

  return (
    <EditorMetadataContext.Provider
      value={{
        title,
        setTitle,
        subtitle,
        setSubtitle,
        content,
        setContent,
      }}
    >
      {children}
    </EditorMetadataContext.Provider>
  );
};

export default EditorMetadataProvider;

export const useEditorMetadata = () => {
  const context = useContext(EditorMetadataContext);

  if (!context) {
    throw new Error(
      'useEditorMetadata must be used within an EditorMetadataProvider',
    );
  }

  return context;
};
