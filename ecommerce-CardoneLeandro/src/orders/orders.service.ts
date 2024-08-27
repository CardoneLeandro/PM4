import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './repository/orders.repository';
import { Order } from './entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly orRep: OrdersRepository) {}
  create(DTO: CreateOrderDto): Promise<Order | null> {
    const { uId, psId } = DTO;
    return this.orRep.addOrder(uId, psId);
  }

  findOne(id: string): Promise<Order | null> {
    return this.orRep.getOrder(id);
  }
}
