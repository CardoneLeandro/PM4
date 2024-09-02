import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from 'config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import { ProductSeederService } from './products/seeder/product-seeder.service';
import { CategoriesSeederService } from './categories/seeder/categories-seeder.service';
import { OrderDetail } from './orders/entities/orderDetails.entity';

@Module({
  imports: [
    // here we import all modules
    AuthModule,
    UsersModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,


    // here we import the config module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
