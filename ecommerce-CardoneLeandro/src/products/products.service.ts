import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './repository/products.repository';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prodRp: ProductsRepository) {}

  async createProduct(data: Partial<Product>): Promise<Product> {
    return await this.prodRp.addProduct(data);
  }

  async getProducts(page: number, limit: number): Promise<Product[]> {
    return await this.prodRp.getProducts(page, limit);
  }

  async getProductById(id: string): Promise<Product | null> {
    return await this.prodRp.getProductById(id);
  }

  async updateProduct(
    id: string,
    data: Partial<Product>,
  ): Promise<string | null> {
    return await this.prodRp.updateProduct(id, data);
  }

  async deleteProduct(id: string): Promise<string | null> {
    return await this.prodRp.deleteProduct(id);
  }
}
