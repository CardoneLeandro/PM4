import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './repository/categories.repository';
import { CategoriesSeederService } from './seeder/categories-seeder.service';
import { ProductsRepository } from 'src/products/repository/products.repository';
import { AuthHeaderGuard } from 'src/auth/guard/auth-headers.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], //thats how we call the entity
  controllers: [CategoriesController],
  providers: [
    CategoriesSeederService,
    CategoriesService,
    CategoriesRepository,
    ProductsRepository,
    AuthHeaderGuard,
  ],
<<<<<<< HEAD
  exports: [
    CategoriesService,
    CategoriesRepository,
    TypeOrmModule,
    CategoriesSeederService,
  ],
=======
  exports: [CategoriesService, CategoriesRepository, TypeOrmModule, CategoriesSeederService],
>>>>>>> 43f08683d353a78355d56b7f75990ed2bfa75512
})
export class CategoriesModule {}
