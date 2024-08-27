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
import { CustomValidationPipe } from './security/pipes/login-user.pipe';

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
  ],
  controllers: [AppController],
  providers: [
    // here we inject a custom provider
    { // we declare a custom provider
      provide:'DTO-ValidationPipe',
      // we inject our custom validation pipe
      useClass: CustomValidationPipe 
    },
    // here we inject all services
    AppService],
})
export class AppModule {}
