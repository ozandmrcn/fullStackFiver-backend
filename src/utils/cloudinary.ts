import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { NextFunction } from "express";
import e from "../utils/error.js";
import { config } from "../config/enviroment.js";

dotenv.config();

/**
 * CLOUDINARY CONFIGURATION
 * Initializes the Cloudinary SDK with credentials from environment variables.
 */
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_SECRET,
});

/**
 * CLOUDINARY UPLOAD HELPER
 * Generic utility function to upload media files to Cloudinary.
 * Supports image transformations like resizing, cropping, and quality adjustment.
 * 
 * @param file_path - Local path of the file to upload
 * @param folder - Target folder in Cloudinary storage
 * @param width - Desired width for resizing
 * @param height - Desired height for resizing
 * @param crop - Cropping mode (e.g., 'fill', 'scale')
 * @param quality - Compression quality (0-100 or 'auto')
 * @param type - Resource type (image, video, etc.)
 */
const upload = async (
  file_path: string,
  folder: string,
  width?: number,
  height?: number,
  crop?: string,
  quality?: string,
  type: "image" | "video" | "raw" | "auto" | undefined = "auto"
) => {
  try {
    const result = await cloudinary.uploader.upload(file_path, {
      folder,
      resource_type: type,
      width,
      height,
      crop,
      quality,
    });
    return result;
  } catch (err) {
    // Throw error so it can be caught by catchAsync in the controller
    throw e(400, "Media upload failed");
  }
};

export default upload;
