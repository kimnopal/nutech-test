import * as transactionRepository from "../repositories/transaction.repository";
import {
  BalanceResponse,
  TopUpResponse,
  TransactionResponse,
  HistoryResponse,
  HistoryRecord,
} from "../types/transaction.types";

export interface BalanceResult {
  success: boolean;
  message: string;
  data?: BalanceResponse;
}

export interface TopUpResult {
  success: boolean;
  message: string;
  data?: TopUpResponse;
  validationError?: boolean;
}

export interface TransactionResult {
  success: boolean;
  message: string;
  data?: TransactionResponse;
  serviceNotFound?: boolean;
  insufficientBalance?: boolean;
}

export interface HistoryResult {
  success: boolean;
  message: string;
  data?: HistoryResponse;
}

export async function getBalance(email: string): Promise<BalanceResult> {
  try {
    const balance = await transactionRepository.getUserBalance(email);

    return {
      success: true,
      message: "Get Balance Berhasil",
      data: { balance },
    };
  } catch (error) {
    console.error("Get balance error:", error);
    return {
      success: false,
      message: "Gagal mengambil balance",
    };
  }
}

export async function topUp(
  email: string,
  amount: number
): Promise<TopUpResult> {
  try {
    // Validate amount
    if (
      typeof amount !== "number" ||
      amount <= 0 ||
      !Number.isInteger(amount)
    ) {
      return {
        success: false,
        message:
          "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
        validationError: true,
      };
    }

    const invoiceNumber = await transactionRepository.generateInvoiceNumber();
    const description = "Top Up balance";

    const result =
      await transactionRepository.updateBalanceAndCreateTransaction(
        email,
        amount,
        "TOPUP",
        invoiceNumber,
        description,
        null
      );

    return {
      success: true,
      message: "Top Up Balance berhasil",
      data: { balance: result.balance },
    };
  } catch (error) {
    console.error("Top up error:", error);
    return {
      success: false,
      message: "Gagal melakukan top up",
    };
  }
}

export async function createPayment(
  email: string,
  serviceCode: string
): Promise<TransactionResult> {
  try {
    const service = await transactionRepository.getServiceByCode(serviceCode);
    if (!service) {
      return {
        success: false,
        message: "Service ataus Layanan tidak ditemukan",
        serviceNotFound: true,
      };
    }

    // Check balance
    const currentBalance = await transactionRepository.getUserBalance(email);
    if (currentBalance < service.service_tariff) {
      return {
        success: false,
        message: "Saldo tidak mencukupi",
        insufficientBalance: true,
      };
    }

    const invoiceNumber = await transactionRepository.generateInvoiceNumber();

    const result =
      await transactionRepository.updateBalanceAndCreateTransaction(
        email,
        service.service_tariff,
        "PAYMENT",
        invoiceNumber,
        service.service_name,
        service.service_code
      );

    return {
      success: true,
      message: "Transaksi berhasil",
      data: {
        invoice_number: result.transaction.invoice_number,
        service_code: service.service_code,
        service_name: service.service_name,
        transaction_type: "PAYMENT",
        total_amount: service.service_tariff,
        created_on: result.transaction.created_on.toISOString(),
      },
    };
  } catch (error) {
    console.error("Create payment error:", error);
    if (error instanceof Error && error.message === "Insufficient balance") {
      return {
        success: false,
        message: "Saldo tidak mencukupi",
        insufficientBalance: true,
      };
    }
    return {
      success: false,
      message: "Gagal melakukan transaksi",
    };
  }
}

export async function getHistory(
  email: string,
  offset: number = 0,
  limit: number | null = null
): Promise<HistoryResult> {
  try {
    const records: HistoryRecord[] =
      await transactionRepository.getTransactionHistory(email, offset, limit);

    return {
      success: true,
      message: "Get History Berhasil",
      data: {
        offset,
        limit: limit ?? 0,
        records,
      },
    };
  } catch (error) {
    console.error("Get history error:", error);
    return {
      success: false,
      message: "Gagal mengambil history",
    };
  }
}
