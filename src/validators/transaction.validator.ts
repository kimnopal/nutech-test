import { z } from "zod";

export const topUpSchema = z.object({
  top_up_amount: z
    .number({
      required_error: "Top up amount harus diisi",
      invalid_type_error: "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
    })
    .int("Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0")
    .positive("Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"),
});

export const transactionSchema = z.object({
  service_code: z
    .string({
      required_error: "Service code harus diisi",
    })
    .min(1, "Service code harus diisi"),
});

export type TopUpInput = z.infer<typeof topUpSchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
