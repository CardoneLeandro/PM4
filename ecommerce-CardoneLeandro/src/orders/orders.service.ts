import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './repository/orders.repository';
import { Order } from './entities/orders.entity';
import { Product } from 'src/products/entities/products.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRep: OrdersRepository) {}

  create(userId: string, productsId: Partial<Product>[]): Promise<{}> | null {
    console.log(
      'CARDONE =========> ORDERS SERVICE IN userId, productsId',
      userId,
      productsId,
    );
    return this.orderRep.addOrder(userId, productsId);
  }

  findOne(id: string): Promise<Order | null> {
    return this.orderRep.getOrderById(id);
  }
}
