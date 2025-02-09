import { v2 as cloudinary } from 'cloudinary';

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
}
