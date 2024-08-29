import { Body, Injectable } from '@nestjs/common';
import { OrdersRepository } from './repository/orders.repository';
import { Order } from './entities/orders.entity';
import { Product } from 'src/products/entities/products.entity';
import { UUID } from 'crypto';
@Injectable()
export class OrdersService {
  constructor(private readonly orRep: OrdersRepository) {}

  create(
    userId: string,
    productsId: Partial<Product>[],
  ): Promise<Order | null> {
    return this.orRep.addOrder(userId, productsId);
  }

  findOne(id: string): Promise<Order | null> {
    return this.orRep.getOrder(id);
  }
}
