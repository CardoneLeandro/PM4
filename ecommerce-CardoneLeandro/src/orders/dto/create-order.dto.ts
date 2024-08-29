import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/entities/products.entity';
import { PrimaryColumn } from 'typeorm';
export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  products: [Partial<Product>];
}
