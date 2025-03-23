"use server";

import { safeAction } from "@/lib/safeAction";
import { CloudinaryService } from "./cloudinary.service";
import { getSignedUrlResponseDto } from "./dto/getSignedUrl.dto";

const cloudinaryService = new CloudinaryService();

export const getSignature = await safeAction(
  async () => {
    return cloudinaryService.getSignature();
  },
  undefined,
  getSignedUrlResponseDto,
);

export const deleteImage = await safeAction(async (url: string) => {
  return cloudinaryService.deleteImage(url);
});
