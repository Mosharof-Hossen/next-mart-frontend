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

const RegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(RegisterValidation),
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
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

                <Button type="submit" className="w-full mt-4">Sign Up</Button>
            </form>
        </Form>
        <p className="text-sm text-gray-500 text-center">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>

    </div>;
};

export default RegisterForm;
