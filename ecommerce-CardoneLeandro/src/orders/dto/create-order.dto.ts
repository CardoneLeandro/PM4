import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/entities/products.entity';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  products: Partial<Product>[];
}
