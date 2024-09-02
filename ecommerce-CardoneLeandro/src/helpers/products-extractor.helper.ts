import { Product } from 'src/products/entities/products.entity';
import { Category } from 'src/categories/entities/categories.entity';

export const productsExtractor = (payload): Partial<Product>[] => {
  const extractedProducts: Product[] = payload.map((seed) => ({
    name: seed.name,
    description: seed.description,
    price: seed.price,
    stock: seed.stock,
    category: { name: seed.category } as Category, // Relación con Category
  }));
  return extractedProducts;
};