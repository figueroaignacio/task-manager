import z from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't march",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
