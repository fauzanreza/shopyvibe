export type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  stockStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
  storeId?: string;
  category?: string;
  featured?: boolean;
  inStock?: boolean;
  details?: string[];
};
