import { z } from "zod";

const RegisterValidation = z.object({
    name: z.string({ required_error: "Name is required" }).min(1, { message: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string({ required_error: "Confirm password is required" }).min(6, { message: "Password must be at least 6 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

export default RegisterValidation;
