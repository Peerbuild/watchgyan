import { v2 as cloudinary } from 'cloudinary';
import { getSignature } from './cloudinary.controller';
import { ApiError } from '@/lib/safeAction';

export class CloudinaryService {
  folder: string;
  constructor() {
    this.folder = 'watchgyan';
  }

  async getSignature() {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: this.folder,
      },
      process.env.CLOUDINARY_API_SECRET!,
    );

    return {
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY!,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    };
  }

  async uploadMedia(file: File) {
    const signResponse = await getSignature();

    const url = `https://api.cloudinary.com/v1_1/${signResponse.cloudName}/upload`;
    const formData = new FormData();

    formData.append('file', file);
    formData.append('api_key', signResponse.apiKey);
    formData.append('timestamp', `${signResponse.timestamp}`);
    formData.append('signature', signResponse.signature);
    formData.append('folder', this.folder);

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
}
