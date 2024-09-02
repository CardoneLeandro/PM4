import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './repository/orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { ProductsRepository } from 'src/products/repository/products.repository';
import { UsersRepository } from 'src/users/repository/users.repository';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { OrderDetail } from './entities/orderDetails.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
