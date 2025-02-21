import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
