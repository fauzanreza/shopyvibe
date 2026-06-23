"use client";

import { products } from "@/data/products";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
    product: (typeof products)[number];
}

export const ProductDetail = ({product}: Props) => {
    const {items, addItem, removeItem} = useCartStore();
    const price = product.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const cartItem = items.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const onAddItem = () => {  
        addItem({
            id: product.id,
            name: product.name,
            price: product.price as number,
            imageUrl: product.imageUrl ? product.imageUrl : null,
            quantity: 1,
        });
    }

    // const onMinItem = () => {
    //     if (quantity > 0) {
    //         addItem({
    //             id: product.id,
    //             name: product.name,
    //             price: product.price as number,
    //             imageUrl: product.imageUrl ? product.imageUrl : null,
    //             quantity: -1,
    //         });
    //     }
    // };

    return( 
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
        {product.imageUrl && (
            <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
                <Image
                    alt={product.name}
                    src={`/${product.imageUrl}`}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:opacity-90 transition-opacity duration-300 ease-in-out rounded-t-lg"
                />
            </div>
        )}
        <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            {product.description && (
                <p className="text-gray-700 mb-2">{product.description}</p>
            )}
            {product.price && (
                <div className="text-lg font-semibold text-gray-900 mb-2">
                    <span className="text-green-600">{price}</span>
                </div>
            )}

            <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    className="bg-white text-black border-gray-400 hover:bg-gray-100 hover:text-black"
                     onClick={() => removeItem && removeItem(product.id)}
                >
                    -
                </Button>
                <span className="text-lg font-semibold">{quantity}</span>
                <Button
                    variant="outline"
                    className="bg-black text-white border-gray-400 hover:bg-gray-900 hover:text-white"
                    onClick={onAddItem}
                >
                    +
                </Button>
            </div>
           
        </div>
    </div>
    );
}; 