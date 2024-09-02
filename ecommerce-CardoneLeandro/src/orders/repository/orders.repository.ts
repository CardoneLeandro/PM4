import { DataSource, Repository, In } from 'typeorm';
import { Order } from '../entities/orders.entity';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { Product } from 'src/products/entities/products.entity';
import { OrderDetail } from 'src/orders/entities/orderDetails.entity';

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.getRepository(Order).manager);
  }

  async createOrder(
    userId: string,
    productIds: string[], // IDs de productos para crear la orden
  ): Promise<Order | null> {
    // Buscar usuario por ID
    const user = await this.dataSource
      .getRepository(User)
      .findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    // Buscar productos por IDs
    const products = await this.dataSource
      .getRepository(Product)
      .findBy({ id: In(productIds) }); //==> operador IN busca en la lista de ids y los devuelve a FindBy
    if (products.length !== productIds.length) {
      throw new Error('One or more products not found');
    }

    // Crear una nueva orden
    const newOrder = new Order();
    newOrder.user = user;
    newOrder.date = new Date(); // Fecha de la orden

    // Crear detalles de la orden
    const orderDetails = new OrderDetail();
    orderDetails.price = products.reduce(
      (totalPrice, product) => totalPrice + product.price,
      0,
    );
    orderDetails.products = products;

    // Guardar los detalles de la orden
    const savedOrderDetails = await this.dataSource
      .getRepository(OrderDetail)
      .save(orderDetails);

    // Asignar los detalles guardados a la orden
    newOrder.orderDetail = savedOrderDetails;

    // Guardar la orden
    const savedOrder = await this.save(newOrder);

    return savedOrder;
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    // Buscar orden por ID con detalles de la orden y productos relacionados
    const order = await this.findOne({
      where: { id: orderId },
      relations: ['orderDetail', 'orderDetail.products'],
    });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}
