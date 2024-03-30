import { z } from "zod";

export const signInValidator = z.object({
  email: z
    .string()
    .email("Email has to be valid")
    .max(100, "Email has to be valid")
    .min(5, "Email has to be valid"),
  password: z
    .string()
    .min(8, "Password must be between 8-18 characters")
    .max(18, "Password must be between 8-18 characters"),
});

export const signUpValidator = z.object({
  email: z
    .string()
    .email("Email has to be valid")
    .max(100, "Email has to be valid")
    .min(5, "Email has to be valid"),
  password: z
    .string()
    .min(8, "Password must be between 8-18 characters")
    .max(18, "Password must be between 8-18 characters"),
  rep_password: z
    .string()
    .min(8, "Password must be between 8-18 characters")
    .max(18, "Password must be between 8-18 characters"),
});
