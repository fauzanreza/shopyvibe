import { ProductList } from "@/components/product-list";
import { products } from "@/data/products";


export default function ProductsPage() {
  return (
    <div className="pb-8">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8"> All Products</h1>
      {/* <p className="text-gray-700">This is the products page.</p> */}
      <ProductList products={products}/>
    </div>
  );
}