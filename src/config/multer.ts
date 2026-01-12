import multer, { MulterError } from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { sendValidationError } from "../utils/response";

dotenv.config();

const uploadDir = process.env.UPLOAD_DIR || "public/uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  const allowedExtensions = [".jpeg", ".png"];

  const ext = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;

  if (allowedMimeTypes.includes(mimeType) && allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadProfileImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export const getImageUrl = (filename: string): string => {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  return `${baseUrl}/${uploadDir}/${filename}`;
};

export const handleProfileImageUpload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  uploadProfileImage.single("file")(req, res, (err) => {
    if (err instanceof MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        sendValidationError(res, "File terlalu besar (maksimal 5MB)");
        return;
      }
      sendValidationError(res, `Upload error: ${err.message}`);
      return;
    }
    if (err) {
      sendValidationError(res, err.message || "Format Image tidak sesuai");
      return;
    }
    next();
  });
};
