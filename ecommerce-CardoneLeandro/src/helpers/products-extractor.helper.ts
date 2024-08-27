import { Product } from 'src/products/entities/products.entity';

export const productsExtractor = (payload): Partial<Product>[] => {
  const seed = payload.JSON;
  const extractedProducts: Product[] = seed.map((seed) => seed.product);
  return extractedProducts;
};
