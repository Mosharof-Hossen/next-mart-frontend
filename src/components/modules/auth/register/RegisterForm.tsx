"use client";

import { FormControl, FormMessage } from "@/components/ui/form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/app/assets/svgs/Logo";
import Link from "next/link";
import RegisterValidation from "./RegisterValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/AuthServices";
import { toast } from "sonner";

const RegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(RegisterValidation),
    });
    const { formState: { isSubmitting } } = form
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        try {
            const response = await registerUser(data);
            console.log(response);
            if (response === true) {
                toast.success("User registered successfully");
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return <div className="w-full border border-gray-200 rounded-lg p-8 space-y-4">
        <div className="flex items-center gap-2">
            <Logo />
            <div>
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <p className="text-sm text-gray-500">Create an account to get started</p>
            </div>
        </div>
        <hr className="w-full border-gray-200" />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div>
                    <FormField

                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md font-medium">Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Name" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                <div>
                    <FormField

                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md font-medium">Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={isSubmitting}>{isSubmitting ? "Signing Up..." : "Sign Up"}</Button>
            </form>
        </Form>
        <p className="text-sm text-gray-500 text-center">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>

    </div>;
};

export default RegisterForm;
