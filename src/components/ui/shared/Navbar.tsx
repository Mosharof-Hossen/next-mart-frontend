"use client"


import { Heart, LogOut, ShoppingBag } from "lucide-react";
import { logoutUser } from "@/services/AuthServices";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "../button";
import Link from "next/link";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";
import { DropdownMenu } from "../dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Separator } from "../separator";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
    const router = useRouter();

    const { user, setIsLoading } = useUser();

    const handleLogout = async () => {
        await logoutUser();
        setIsLoading(true);
        // router.push("/login");
    }

    return (
        <header className="border-b w-full">
            <div className="container flex justify-between items-center mx-auto h-16 px-3">
                <h1 className="text-2xl font-black flex items-center">
                    <Logo />
                    Next Mart
                </h1>
                <div className="max-w-md  flex-grow">
                    <input
                        type="text"
                        placeholder="Search for products"
                        className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
                    />
                </div>
                <nav className="flex gap-2">
                    <Button variant="outline" className="rounded-full p-0 size-10">
                        <Heart />
                    </Button>
                    <Button variant="outline" className="rounded-full p-0 size-10">
                        <ShoppingBag />
                    </Button>
                    {!user ? (
                        <>
                            <Link href="/login">
                                <Button variant="outline" className="rounded-full px-3">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/create-shop">
                                <Button variant="outline" className="rounded-full px-3">
                                    Create Shop
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>User</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                                <DropdownMenuItem>Shop</DropdownMenuItem>
                                <Separator />

                                <DropdownMenuItem className="bg-red-600 mt-2 text-white cursor-pointer" onClick={handleLogout}>
                                    Logout
                                    <LogOut className="w-4 h-4 text-white" />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </nav>
            </div>
        </header>
    );
}