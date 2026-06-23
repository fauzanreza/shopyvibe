"use client";

import { products } from "@/data/products";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
    product: typeof products;
}

export const Carousel = ({product}: Props) => {
    const [current, setCurrent] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % product.length);
        }
        , 3000); // Change slide every 3 seconds
        return () => clearInterval(interval);
    }, [product.length]);

    const currentProduct = product[current];

    const price = currentProduct.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    return (
        <Card className="relative overflow-hidden rounded-lg shadow-lg border-gray-200 h-80 flex items-center justify-center">
            {currentProduct.imageUrl && currentProduct.imageUrl[0] && (
            <div className="absolute inset-0">
            <Image 
            alt={currentProduct.name} 
            src={`/${currentProduct.imageUrl}`} 
            layout="fill" 
            objectFit="cover" 
            className="opacity-85"
            />
            </div>
            )}
            <CardContent className="relative flex flex-col items-center justify-center p-6 bg-white bg-opacity-90 text-center">
            <CardTitle className="text-3xl font-bold text-white mb-2">{currentProduct.name}</CardTitle>
            {price && (
            <p className="text-lg text-white font-semibold">{price}</p>
            )}
            <p className="text-sm text-white">{currentProduct.description}</p>
             {/* <p className="text-sm text-white">Category: {currentProduct.category}</p>
            <p className="text-sm text-white">In Stock: {currentProduct.inStock ? "Yes" : "No"}</p>
            <p className="text-sm text-white">Featured: {currentProduct.featured ? "Yes" : "No"}</p>
            <ul className="list-disc pl-5 mt-2">
                {currentProduct.details.map((detail, index) => (
                    <li key={index} className="text-sm text-white">{detail}</li>
                ))}
            </ul> */}
            </CardContent>
        </Card>
    );
};