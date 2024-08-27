import { Injectable } from '@nestjs/common';
import { Category } from '../entities/categories.entity';
import { categoriesExtractor } from '../../helpers/category-extractor.helper';
import { seed } from '../../utils/pre-load.seed';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CategoriesSeederService {
  constructor(
    @InjectRepository(Category)
    private readonly catRp: Repository<Category>,
  ) {}

  async preload() {
    const seedOfCategories: Category[] = categoriesExtractor(seed);
    if (seedOfCategories.length === 0) return;
    const categories: Category[] = await this.catRp.find();
    const newCategories: Category[] = seedOfCategories.filter(
      (category) => !categories.find((cat) => cat.name === category.name),
    );
    for (const cat of newCategories) {
      await this.catRp.save({ name: cat.name });
    }
    return;
  }
}
