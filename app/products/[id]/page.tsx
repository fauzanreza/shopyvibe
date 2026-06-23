import { ProductDetail } from "@/components/product-detail";
import { products } from "@/data/products";


export default async function ProductsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);
    if (!product) {
        return (
            <div className="container mx-auto p-8">
                <h1 className="text-2xl font-bold">Product not found</h1>
            </div>
        );
    }
  return <ProductDetail product={product} />;
}

//   <ProductList products={products}/>
// "use client";

// import React, { useRef } from "react";
// import { products } from "@/data/products";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function ProductPage({
//     params,
// }: {
//     params: Promise<{ id: string }>;
// }) {
//     const { id } = React.use(params);
//     const product = products.find((p) => p.id === id);
//     const carouselRef = useRef<HTMLDivElement>(null);

//     if (!product) {
//         return (
//             <div className="container mx-auto p-8">
//                 <h1 className="text-2xl font-bold">Product not found</h1>
//             </div>
//         );
//     }

//     const price = product.price.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//     });

//     // Get suggested products (same category, not current product)
//     const suggested = products.filter(
//         (p) => p.category === product.category && p.id !== product.id
//     );

//     // Clone items to create infinite loop effect
//     const infiniteSuggested = [...suggested, ...suggested, ...suggested];

//     const scrollLeft = () => {
//         if (carouselRef.current) {
//             carouselRef.current.scrollBy({
//                 left: -200,
//                 behavior: "smooth",
//             });
//         }
//     };

//     const scrollRight = () => {
//         if (carouselRef.current) {
//             carouselRef.current.scrollBy({
//                 left: 200,
//                 behavior: "smooth",
//             });
//         }
//     };

//     return (
//         <div className="container mx-auto p-8 flex flex-col gap-10">
//             <div className="flex flex-col md:flex-row gap-10">
//                 {/* Product Image */}
//                 <div className="flex-1 flex justify-center items-start">
//                     <div className="relative w-full max-w-md h-[400px] bg-white rounded-lg shadow border overflow-hidden">
//                         <Image
//                             src={`/${product.imageUrl}`}
//                             alt={product.name}
//                             fill
//                             className="object-cover rounded-lg"
//                             priority
//                         />
//                     </div>
//                 </div>

//                 {/* Product Info */}
//                 <div className="flex-1 flex flex-col gap-6">
//                     <div>
//                         <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//                         <p className="text-gray-600 text-lg mb-2">{product.description}</p>
//                         <div className="flex items-center gap-4 mb-2">
//                             <span className="text-2xl font-bold text-green-700">{price}</span>
//                             {product.inStock ? (
//                                 <span className="text-sm text-green-600 font-semibold">In Stock</span>
//                             ) : (
//                                 <span className="text-sm text-red-600 font-semibold">Out of Stock</span>
//                             )}
//                         </div>
//                         <div className="mb-4">
//                             <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs uppercase tracking-wide">
//                                 {product.category}
//                             </span>
//                             {product.featured && (
//                                 <span className="ml-2 inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-xs font-semibold">
//                                     Featured
//                                 </span>
//                             )}
//                         </div>
//                     </div>

//                     {/* Product Details */}
//                     <div>
//                         <h2 className="text-lg font-semibold mb-2">Product Details</h2>
//                         <ul className="list-disc list-inside text-gray-700 space-y-1">
//                             {product.details.map((detail, i) => (
//                                 <li key={i}>{detail}</li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Actions */}
//                     <div className="mt-6 flex gap-4">
//                         <Button
//                             size="lg"
//                             className="font-bold px-8 py-3 rounded shadow"
//                             disabled={!product.inStock}
//                         >
//                             Add to Cart
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="lg"
//                             className="px-8 py-3 rounded"
//                             asChild
//                         >
//                             <Link href="/">Back to Shop</Link>
//                         </Button>
//                     </div>
//                 </div>
//             </div>

//             {/* Suggested Products */}
//             {suggested.length > 0 && (
//                 <div className="relative">
//                     <h2 className="text-2xl font-bold mb-4">You might also like</h2>
//                     <div className="relative group">
//                         {/* Left Arrow */}
//                         <button
//                             onClick={scrollLeft}
//                             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
//                             aria-label="Previous"
//                         >
//                             <ChevronLeft className="h-6 w-6 text-gray-800" />
//                         </button>

//                         {/* Carousel */}
//                         <div
//                             ref={carouselRef}
//                             className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 py-2"
//                             style={{ scrollbarWidth: 'none' }}
//                         >
//                             {infiniteSuggested.map((s, index) => (
//                                 <Link
//                                     key={`${s.id}-${index}`} // Important for infinite loop
//                                     href={`/products/${s.id}`}
//                                     className="flex-shrink-0 w-48 sm:w-56 bg-white rounded-lg shadow border hover:shadow-lg transition snap-start"
//                                 >
//                                     <div className="relative w-full h-40 sm:h-48">
//                                         <Image
//                                             src={`/${s.imageUrl}`}
//                                             alt={s.name}
//                                             fill
//                                             className="object-cover rounded-t-lg"
//                                         />
//                                     </div>
//                                     <div className="p-3 sm:p-4">
//                                         <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{s.name}</h3>
//                                         <p className="text-green-700 font-bold text-sm sm:text-base mt-1">
//                                             {s.price.toLocaleString("en-US", {
//                                                 style: "currency",
//                                                 currency: "USD",
//                                             })}
//                                         </p>
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>

//                         {/* Right Arrow */}
//                         <button
//                             onClick={scrollRight}
//                             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
//                             aria-label="Next"
//                         >
//                             <ChevronRight className="h-6 w-6 text-gray-800" />
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }