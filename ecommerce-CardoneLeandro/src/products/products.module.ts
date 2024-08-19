import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/products.entity'; // Ruta a la entidad

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Importa la entidad
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}