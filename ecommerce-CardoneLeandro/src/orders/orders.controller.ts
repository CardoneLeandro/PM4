import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { NotFoundError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orSv: OrdersService) {}

  @Post()
  async create(@Body() DTO: CreateOrderDto) {
    try{
      const or = await this.orSv.create(DTO);
      if (!or) {throw new Error('Order could not be created')}
      return or 
    }
    catch(e){
      console.error(e)
      throw new NotFoundException(e.message)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const or = this.orSv.findOne(id);
      if (!or) {throw new Error(`Order not found with id ${id}}`)}
      return or
    } catch (e) {
      console.error(e)
      throw new NotFoundException(e.message)
    }
  }

}
