import { v2 as cloudinary } from "cloudinary";

export class CloudinaryService {
  folder: string;
  cloudinary: typeof cloudinary;
  constructor() {
    this.folder = "watchgyan";
    this.cloudinary = cloudinary;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async getSignature() {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = this.cloudinary.utils.api_sign_request(
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

  async deleteImage(url: string) {
    await this.cloudinary.uploader.destroy(this.getCloudinaryId(url));

    return `Image with url ${url} deleted`;
  }

  private getCloudinaryId(url: string) {
    const splitUrl = url.split("/");
    const publicId = splitUrl[splitUrl.length - 1].split(".")[0];
    return this.folder + "/" + publicId;
  }
}
