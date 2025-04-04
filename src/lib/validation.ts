import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email cannot be empty").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
