import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const uploadDir = process.env.UPLOAD_DIR || "public/uploads";

export function extractFilename(imageUrlOrFilename: string): string | null {
  try {
    const url = new URL(imageUrlOrFilename);
    const pathname = url.pathname;
    const filename = path.basename(pathname);
    return filename || null;
  } catch {
    const parts = imageUrlOrFilename.split("/");
    return parts[parts.length - 1] || null;
  }
}

export function deleteUploadedFile(filename: string): void {
  try {
    const filePath = path.join(uploadDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.warn(`Failed to delete file ${filename}:`, error);
  }
}

export function deleteImageByUrl(imageUrlOrFilename: string): void {
  const filename = extractFilename(imageUrlOrFilename);
  if (filename) {
    deleteUploadedFile(filename);
  }
}
