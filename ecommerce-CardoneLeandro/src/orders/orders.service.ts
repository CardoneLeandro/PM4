import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './repository/orders.repository';
import { Order } from './entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRep: OrdersRepository) {}

  create(userId: string, productsId: string[]): Promise<Order | null> {
    return this.orderRep.createOrder(userId, productsId);
  }

  findOne(id: string): Promise<Order | null> {
    return this.orderRep.getOrderById(id);
  }
}
