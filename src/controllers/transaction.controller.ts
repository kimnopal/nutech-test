import { Request, Response } from "express";
import * as transactionService from "../services/transaction.service";
import {
  sendSuccess,
  sendValidationError,
  sendInvalidToken,
} from "../utils/response";
import { TopUpRequest, TransactionRequest } from "../types/transaction.types";

export async function getBalance(req: Request, res: Response): Promise<void> {
  try {
    const email = req.user?.email;

    if (!email) {
      sendInvalidToken(res, "Token tidak tidak valid atau kadaluwarsa");
      return;
    }

    const result = await transactionService.getBalance(email);

    if (!result.success) {
      sendValidationError(res, result.message);
      return;
    }

    sendSuccess(res, result.message, result.data);
  } catch (error) {
    console.error("Get balance error:", error);
    sendValidationError(res, "Gagal mengambil balance");
  }
}

export async function topUp(req: Request, res: Response): Promise<void> {
  try {
    const email = req.user?.email;
    const { top_up_amount } = req.body as TopUpRequest;

    if (!email) {
      sendInvalidToken(res, "Token tidak tidak valid atau kadaluwarsa");
      return;
    }

    const result = await transactionService.topUp(email, top_up_amount);

    if (!result.success) {
      if (result.validationError) {
        sendValidationError(res, result.message);
        return;
      }
      sendValidationError(res, result.message);
      return;
    }

    sendSuccess(res, result.message, result.data);
  } catch (error) {
    console.error("Top up error:", error);
    sendValidationError(res, "Gagal melakukan top up");
  }
}

export async function createTransaction(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const email = req.user?.email;
    const { service_code } = req.body as TransactionRequest;

    if (!email) {
      sendInvalidToken(res, "Token tidak tidak valid atau kadaluwarsa");
      return;
    }

    const result = await transactionService.createPayment(email, service_code);

    if (!result.success) {
      if (result.serviceNotFound) {
        sendValidationError(res, result.message);
        return;
      }
      if (result.insufficientBalance) {
        sendValidationError(res, result.message);
        return;
      }
      sendValidationError(res, result.message);
      return;
    }

    sendSuccess(res, result.message, result.data);
  } catch (error) {
    console.error("Create transaction error:", error);
    sendValidationError(res, "Gagal melakukan transaksi");
  }
}

export async function getHistory(req: Request, res: Response): Promise<void> {
  try {
    const email = req.user?.email;

    if (!email) {
      sendInvalidToken(res, "Token tidak tidak valid atau kadaluwarsa");
      return;
    }

    const offset = parseInt(req.query.offset as string, 10) || 0;
    const limitParam = req.query.limit as string;
    const limit = limitParam ? parseInt(limitParam, 10) : null;

    const result = await transactionService.getHistory(email, offset, limit);

    if (!result.success) {
      sendValidationError(res, result.message);
      return;
    }

    sendSuccess(res, result.message, result.data);
  } catch (error) {
    console.error("Get history error:", error);
    sendValidationError(res, "Gagal mengambil history");
  }
}
