import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/products.entity'; // Ruta a la entidad
import { ProductsRepository } from './repository/products.repository';
import { ProductSeederService } from './seeder/product-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Importa la entidad
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, ProductSeederService],
})
export class ProductsModule {}
