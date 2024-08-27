import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './repository/categories.repository';
import { CategoriesSeederService } from './seeder/categories-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], //thats how we call the entity
  controllers: [CategoriesController],
  providers: [CategoriesSeederService, CategoriesService, CategoriesRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
