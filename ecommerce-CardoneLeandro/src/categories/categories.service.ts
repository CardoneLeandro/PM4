import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategoriesService{
  constructor(
    @InjectRepository(Category) //Here inject the entity that will be used on the repository
    private readonly catRp: Repository<Category> // here declare the repository as "categoriesReposiroty" using the repository with the entity Category
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.catRp.find();
  }

  async addCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.catRp.create(createCategoryDto);
    return await this.catRp.save(newCategory);
  }
}