import {IsArray, IsEmpty, IsNotEmpty, IsUUID} from 'class-validator';
import { Product } from 'src/products/entities/products.entity';
export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsEmpty()
  @IsArray()
  products:ProductDTO[];
}
