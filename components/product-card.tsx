import { products } from "@/data/products";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface ProductCardProps {
    product: (typeof products)[number];
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const price = product.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return (
        <Link href={`/products/${product.id}`} className="block h-full">
        <Card className="group hover:shadow-2xl transition duration-300 ease-in-out py-0 flex flex-col h-full border border-gray-200 hover:border-gray-300">
            {product.imageUrl && (
                <div className="relative w-full h-80">
                    <Image
                        alt={product.name}
                        src={`/${product.imageUrl}`}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:opacity-90 transition-opacity duration-300 ease-in-out rounded-t-lg"
                    />
                </div>
            )}
            <CardHeader className="px-4">
                <CardTitle className="text-xl font-bold text-gray-800">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 flex-grow flex flex-col justify-between">
                <p className="text-xl font-bold">{price}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
            </CardContent>
            <div className="px-4 pb-4 mt-auto flex justify-center">
                <Button className="w-full">
                    View Detail
                </Button>
            </div>
        </Card>
        </Link>
    );
};
