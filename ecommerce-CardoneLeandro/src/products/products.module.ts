import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/products.entity'; // Ruta a la entidad
import { ProductsRepository } from './repository/products.repository';
import { ProductSeederService } from './seeder/product-seeder.service';
import { CloudinaryConfig } from 'config/coudinary.config';
import { CloudinaryUploadService } from '../files/files.service';
import { AuthHeaderGuard } from 'src/auth/guard/auth-headers.guard';
import { CategoriesModule } from 'src/categories/categories.module';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule, AuthModule], // Importa la entidad

  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    ProductSeederService,
    CloudinaryConfig,
    CloudinaryUploadService,
    AuthHeaderGuard,
    RolesGuard,
  ],
  exports: [ProductsService, ProductsRepository, ProductSeederService],
})
export class ProductsModule {}
