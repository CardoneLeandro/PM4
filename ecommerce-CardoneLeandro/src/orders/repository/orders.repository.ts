import { DataSource, Repository, In } from 'typeorm';
import { Order } from '../entities/orders.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Product } from 'src/products/entities/products.entity';
import { OrderDetail } from 'src/orders/entities/orderDetails.entity';
import { UsersRepository } from 'src/users/repository/users.repository';
import { ProductsRepository } from 'src/products/repository/products.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRp: UsersRepository,
    private readonly prodRp: ProductsRepository,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRp: Repository<OrderDetail>,
  ) {
    super(Order, dataSource.getRepository(Order).manager);
  }

  async addOrder(
    userId: string,
    productIds: Partial<Product>[],
  ): Promise<{}> | null {
    console.log(
      'CARDONE =========> ORDERS REPOSITORY!!!!!!!!!!!!!!!!!!!!!! userId, productIds',
      userId,
      productIds,
    );
    //*     Buscar usuario por ID
    const user = await this.userRp.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    console.log('CARDONE =========> ORDERS REPOSITORY user', user);
    console.log('CARDONE =========> ORDERS REPOSITORY productIds', productIds);
    //*     ELIMINO LOS ID DUPLICADOS
    const oneOfEach = [...new Set(productIds.map((item) => item.id))];
    console.log('CARDONE =========> ORDERS REPOSITORY oneOfEach', oneOfEach);
    //*      Buscar productos por IDs recibidos
    const searchProducts = await this.prodRp.findBy({ id: In(oneOfEach) }); //?==> operador IN busca en la lista de ids y los devuelve a FindBy
    if (searchProducts.length !== oneOfEach.length) {
      throw new BadRequestException('One or more products not found');
    }
    //!     se eliminan los productos con stock 0
    const productsWithStock: Product[] = searchProducts.filter(
      (product) => product.stock > 0,
    );
    const products = productsWithStock.map((product) => {
      this.stockUpdate(product.id);
      return product;
    });

    console.log('CARDONE =========> ORDERS REPOSITORY products', products);
    //*     SE CREA LA NUEVA ORDEN => ID => !USER => !DATE => ORDERDETAIL => PRODUCTS

    const newOrder: Partial<Order> = new Order();
    //*     A NEWORDER SE LE ASIGNA "USER"
    newOrder.user = user;
    //*     A NEWORDER SE LE ASIGNA "DATE"
    newOrder.date = new Date();

    //*     SE CREA EL DETALLE DE LA ORDEN
    const orderDetails = new OrderDetail();
    //*     SE LE ASIGNA EL VALOR DE PRECIO CON "REDUCE" => PRICE
    orderDetails.price = products.reduce(
      (totalPrice, product) => totalPrice + Number(product.price),
      0,
    );
    //*     SE AGREGAN LOS PRODUCTOS AL DETALLE DE LA ORDEN
    orderDetails.products = products;
    //*     SE CREA Y SE GUARDA EL DETALLE DE LA ORDEN
    const createOrderDetails = await this.orderDetailRp.create(orderDetails);
    const savedOrderDetails = await this.orderDetailRp.save(createOrderDetails);

    //*     SE ASIGNA EL DETALLE DE LA ORDEN AL NEWORDER
    newOrder.orderDetail = savedOrderDetails;

    // Guardar la orden
    const createOrder = await this.create(newOrder);
    const savedOrder = await this.save(createOrder);

    return {
      savedOrder,
      price: orderDetails.price,
      detailsId: savedOrderDetails.id,
    };
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

  async stockUpdate(productId: string): Promise<void> {
    await this.prodRp.update(productId, { stock: () => 'stock - 1' });
  }
}

/*
const orderModel =  {
  "userId":"UUID del usuario",
    "products":[
                {"id":"UUID del producto 1"},
                {"id":"UUID del producto 2"},
                {"id":"UUID del producto 3"},
                {"id":"UUID del producto 4"},
                {"id":"UUID del producto 5"},
                                          ]
}
*/
