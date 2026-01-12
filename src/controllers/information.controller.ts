import { Request, Response } from "express";
import * as informationService from "../services/information.service";
import { sendSuccess, sendValidationError } from "../utils/response";

export async function getBanners(_req: Request, res: Response): Promise<void> {
  try {
    const result = await informationService.getBanners();

    if (!result.success) {
      sendValidationError(res, result.message);
      return;
    }

    sendSuccess(res, result.message, result.data);
  } catch (error) {
    console.error("Get banners error:", error);
    sendValidationError(res, "Gagal mengambil data banner");
  }
}

export async function getServices(_req: Request, res: Response): Promise<void> {
  try {
    const result = await informationService.getServices();

    if (!result.success) {
      sendValidationError(res, result.message);
      return;
    }

    sendSuccess(res, result.message, result.data);
  } catch (error) {
    console.error("Get services error:", error);
    sendValidationError(res, "Gagal mengambil data services");
  }
}
