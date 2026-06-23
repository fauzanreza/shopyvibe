"use client";

import { useCartStore } from "@/store/cart-store";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => { 
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const items = useCartStore((state) => state.items);
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])
    return (
        <nav className="sticky top-0 z-50 bg-white shadow">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className="text-xl font-bold hover:text-sky-600">Shopyverse</Link>
                <div className="hidden md:flex space-x-6">
                    <Link href="/">Home</Link>
                    <Link href="/products" className="hover:text-sky-600">Products</Link>
                    <Link href="/checkout" className="hover:text-sky-600">Checkout</Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/checkout" className="relative">
                        <ShoppingCartIcon className="h-6 w-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <Button
                        variant={"ghost"}
                        className="md:hidden"
                        onClick={() => setMobileOpen((prev) => !prev)}
                    >
                        {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </Button>
                </div>
            </div>
            {mobileOpen && (
               <nav>
                <ul>
                    <li className="p-4 border-b border-gray-200">
                        <Link href="/" className="block hover:text-sky-600">Home</Link>
                    </li>
                    <li className="p-4 border-b border-gray-200">
                        <Link href="/products" className="block hover:text-sky-600">Products</Link>
                    </li>
                    <li className="p-4 border-b border-gray-200">
                        <Link href="/checkout" className="block hover:text-sky-600">Checkout</Link>
                    </li>
                </ul>
               </nav>
            )}
        </nav>
    );
};