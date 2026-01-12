import { z } from "zod";

export const registrationSchema = z.object({
  email: z
    .string({
      required_error: "Email harus diisi",
    })
    .email("Paramter email tidak sesuai format"),
  first_name: z
    .string({
      required_error: "First name harus diisi",
    })
    .min(1, "First name harus diisi"),
  last_name: z
    .string({
      required_error: "Last name harus diisi",
    })
    .min(1, "Last name harus diisi"),
  password: z
    .string({
      required_error: "Password harus diisi",
    })
    .min(8, "Password minimal 8 karakter"),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email harus diisi",
    })
    .email("Paramter email tidak sesuai format"),
  password: z
    .string({
      required_error: "Password harus diisi",
    })
    .min(8, "Password minimal 8 karakter"),
});

export const updateProfileSchema = z.object({
  first_name: z
    .string({
      required_error: "First name harus diisi",
    })
    .min(1, "First name harus diisi"),
  last_name: z
    .string({
      required_error: "Last name harus diisi",
    })
    .min(1, "Last name harus diisi"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
