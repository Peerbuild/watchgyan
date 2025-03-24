import { getSignature } from "@/features/cloudinary/cloudinary.controller";
import { clsx, type ClassValue } from "clsx";
import { EditorInstance, JSONContent } from "novel";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-caps2", "text-caps3"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEditorContentEmpty(content: JSONContent | undefined) {
  return (
    content === undefined || !content.content || !content.content[0].content
  );
}

export async function uploadMedia(file: File) {
  const ApiError = (await import("./ApiError")).default;
  const signResponse = await getSignature();

  const url = `https://api.cloudinary.com/v1_1/${signResponse.cloudName}/upload`;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", signResponse.apiKey);
  formData.append("timestamp", `${signResponse.timestamp}`);
  formData.append("signature", signResponse.signature);
  formData.append("folder", "watchgyan");

  try {
    const resonse = await fetch(url, {
      method: "POST",
      body: formData,
    });
    console.log("Uploaded image");
    return await resonse.json();
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Failed to upload media");
  }
}

export function isLastNode(editor: EditorInstance, offset = 0) {
  const { state } = editor;
  const { selection } = state;

  const currentPosition = selection.$head.pos;
  const lastNodePosition =
    state.doc.content.size - (state.doc.lastChild?.nodeSize ?? 0) + 1 + offset;

  return {
    isLast: currentPosition === lastNodePosition,
    lastNodePosition,
    currentPosition,
  };
}
