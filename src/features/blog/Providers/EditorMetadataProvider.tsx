"use client";
import { JSONContent } from "novel";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface EditorMetadataContextProps {
  id: string;
  setId: (id: string) => void;
  isDraft: boolean;
  setIsDraft: (isDraft: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  subtitle: string;
  setSubtitle: (subtitle: string) => void;
  content: JSONContent | undefined;
  setContent: (content: JSONContent) => void;
  description: string;
  setDescription: (description: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  thumbnail: string;
  setThumbnail: (thumbnail: string) => void;
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
}

const EditorMetadataContext = createContext<EditorMetadataContextProps | null>(
  null,
);

const EditorMetadataProvider = ({ children }: PropsWithChildren) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState<JSONContent | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState("");
  const [isDraft, setIsDraft] = useState(true);
  const [id, setId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  return (
    <EditorMetadataContext.Provider
      value={{
        id,
        setId,
        isDraft,
        setIsDraft,
        title,
        setTitle,
        subtitle,
        setSubtitle,
        content,
        setContent,
        description,
        setDescription,
        tags,
        setTags,
        thumbnail,
        setThumbnail,
        isSaving,
        setIsSaving,
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
      "useEditorMetadata must be used within an EditorMetadataProvider",
    );
  }
  return context;
};
