import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { IsUUIDPipe } from 'src/common/pipes/isUUID.pipe';
import { AuthHeaderGuard } from 'src/auth/guard/auth-headers.guard';
import { Product } from 'src/products/entities/products.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orSv: OrdersService) {}

  @Post()
  @UseGuards(AuthHeaderGuard)
  @UsePipes(new DTOValidationPipe())
  async create(@Body() DTO: CreateOrderDto) {
    console.log('CARDONE =========> ORDERS CONTROLLER IN, DTO', DTO);
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
  @UseGuards(AuthHeaderGuard)
  findOne(@Param('id', new IsUUIDPipe()) id: string) {
    try {
      const order = this.orSv.findOne(id);
      if (!order) {
        throw new Error(`Order not found with id ${id}}`);
      }
      return order;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error.message);
    }
  }
}
