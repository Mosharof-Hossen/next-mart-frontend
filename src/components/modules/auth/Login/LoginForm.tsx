'use client'

import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LoginValidation } from "./LoginValidation";
import { loginUser, verifyRecaptcha } from "@/services/AuthServices";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

export default function LoginForm() {
    const [recaptchaStatus, setRecaptchaStatus] = useState(false)
    const form = useForm({
        resolver: zodResolver(LoginValidation),
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        try {
            const response = await loginUser(data);
            console.log(response);
            if (response === true) {
                toast.success("User logged in successfully");
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleRecaptchaChange = async (value: string) => {
        try {
            const response = await verifyRecaptcha(value);
            console.log(response);
            if (response.success) {
                setRecaptchaStatus(true)
            } else {
                setRecaptchaStatus(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const { formState: { isSubmitting } } = form
    return <div className="w-full border border-gray-200 rounded-lg p-8 space-y-4">
        <div className="flex items-center gap-2">
            <Logo />
            <div>
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-sm text-gray-500">Login to your account to get started</p>
            </div>
        </div>
        <hr className="w-full border-gray-200" />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

                <div>
                    <FormField

                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md font-medium">Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField

                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md font-medium">Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_CLIENT_RECAPTCHA_SITE_KEY as string}
                    onChange={(value) => handleRecaptchaChange(value as string)}
                />

                <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={isSubmitting || !recaptchaStatus}>{isSubmitting ? "Signing In..." : "Sign In"}</Button>
            </form>
        </Form>
        <p className="text-sm text-gray-500 text-center">Do not have an account? <Link href="/register" className="text-blue-500">Register</Link></p>

    </div>;
}
