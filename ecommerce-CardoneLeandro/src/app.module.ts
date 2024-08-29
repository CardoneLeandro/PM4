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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DTOValidationPipe } from './common/pipes/DTO-Validation.pipe';
import { StringToNumberInterceptor } from './common/interceptor/string-toNumber.interceptor';

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
  providers: [
    {
      provide: 'DTO-ValidationPipe',
      useClass: DTOValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: StringToNumberInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
