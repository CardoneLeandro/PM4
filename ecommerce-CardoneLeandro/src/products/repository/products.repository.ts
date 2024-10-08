import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/products.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(private dSource: DataSource) {
    super(Product, dSource.getRepository(Product).manager);
  }

  async addProduct(pData: Partial<Product>): Promise<Product> {
    const newProduct = this.create(pData);
    await this.save(newProduct);
    const createdProduct = await this.findOne({
      where: { id: newProduct.id },
      relations: ['category'],
    });
    return createdProduct;
  }

  async getProducts(page: number, limit: number): Promise<Product[]> {
    const skip = (page - 1) * limit;
    return await this.find({ relations: ['category'], skip, take: limit });
  }

  async getProductById(id: string): Promise<Product | null> {
    return await this.findOne({ where: { id }, relations: ['category'] });
  }

  async updateProduct(
    id: string,
    data: Partial<Product>,
  ): Promise<string | null> {
    await this.update({ id }, data);
    return id;
  }
  async deleteProduct(id: string): Promise<string | null> {
    await this.delete({ id });
    return id;
  }
}
