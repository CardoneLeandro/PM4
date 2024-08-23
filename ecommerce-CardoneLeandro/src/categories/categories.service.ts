import { Injectable } from '@nestjs/common';
import { Category } from './entities/categories.entity';
import { CategoriesRepository } from './repository/categories.repository';


@Injectable()
export class CategoriesService{
  constructor(
    private readonly catRp:CategoriesRepository
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.catRp.getCategories();
  }

  async addCategory(data): Promise<Category> {
    return await this.catRp.addCategory(data);
  }

}

