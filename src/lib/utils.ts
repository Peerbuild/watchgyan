import { getSignature } from '@/features/cloudinary/cloudinary.controller';
import { clsx, type ClassValue } from 'clsx';
import { JSONContent } from 'novel';
import { twMerge } from 'tailwind-merge';
import { ApiError } from './safeAction';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEditorContentEmpty(content: JSONContent | undefined) {
  return (
    content === undefined || !content.content || !content.content[0].content
  );
}

export async function uploadMedia(file: File) {
  const signResponse = await getSignature();

  const url = `https://api.cloudinary.com/v1_1/${signResponse.cloudName}/upload`;
  const formData = new FormData();

  formData.append('file', file);
  formData.append('api_key', signResponse.apiKey);
  formData.append('timestamp', `${signResponse.timestamp}`);
  formData.append('signature', signResponse.signature);
  formData.append('folder', 'watchgyan');

  try {
    const resonse = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    return await resonse.json();
  } catch (error) {
    console.log(error);
    throw new ApiError(500, 'Failed to upload media');
  }
}
