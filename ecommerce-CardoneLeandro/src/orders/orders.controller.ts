import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UsePipes,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UUID } from 'crypto';
import { Product } from 'src/products/entities/products.entity';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { IsUUIDPipe } from 'src/common/pipes/isUUID.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orSv: OrdersService) {}

  @Post()
  @UsePipes(new DTOValidationPipe())
  async create(@Body() DTO: CreateOrderDto) {
    const userId = DTO.userId;
    const products: Partial<Product>[] = DTO.products;
    try {
      const newOrder = await this.orSv.create(userId, products);
      if (!newOrder) {
        throw new Error('Order could not be created');
      }
      return newOrder;
    } catch (e) {
      console.error(e);
      throw new NotFoundException(e.message);
    }
  }

  @Get(':id')
  @UsePipes(IsUUIDPipe)
  findOne(@Param('id') id: string) {
    try {
      const or = this.orSv.findOne(id);
      if (!or) {
        throw new Error(`Order not found with id ${id}}`);
      }
      return or;
    } catch (e) {
      console.error(e);
      throw new NotFoundException(e.message);
    }
  }
}
