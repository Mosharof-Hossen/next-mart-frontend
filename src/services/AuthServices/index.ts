'use server'

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const registerUser = async (data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const response = await res.json();
        if (response.success) {
            const cookieStore = await cookies();
            cookieStore.set("accessToken", response.data.accessToken);
        }
        return response;
    } catch (error) {
        console.log(error);
        return { error: "Failed to register user" };
    }

}


export const loginUser = async (data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const response = await res.json();
        if (response.success) {
            const cookieStore = await cookies();
            cookieStore.set("accessToken", response.data.accessToken);
        }
        return response;
    } catch (error) {
        console.log(error);
        return { error: "Failed to login user" };
    }
}

export const getCurrentUser = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    let decodedData = null;
    if (!accessToken) {
        return null;
    }
    decodedData = await jwtDecode(accessToken?.value as string);
    return decodedData;
}


export const verifyRecaptcha = async (token: string) => {
    try {
        const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            secret: process.env.NEXT_PUBLIC_SERVER_RECAPTCHA_SITE_KEY as string,
            response: token,
        }),
    })
        const response = await res.json();
        return response;
    } catch (error) {
        console.log(error);
        return { error: "Failed to verify recaptcha" };
    }
}

export const logoutUser = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
}

