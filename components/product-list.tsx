"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./product-card";
import { useState } from "react";

interface ProductListProps {
    products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredProducts = products.filter(product => {
        const term = searchTerm.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(term);
        const descriptionMatch = product.description ? product.description.toLowerCase().includes(term) : false;

        return nameMatch || descriptionMatch;
    })

    return (
        <div>
            <div className="mb-6 flex justify-center items-center">
            <input 
            type="text" 
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search Products" 
            className="w-full max-w-md rounded border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, key) => (
              <li key={key} className="mb-4">
                <ProductCard product={product} />
            </li>
            ))}
            </ul>
        </div>
    );
};