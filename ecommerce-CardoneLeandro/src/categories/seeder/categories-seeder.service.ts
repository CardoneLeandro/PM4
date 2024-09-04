import { Injectable } from '@nestjs/common';
import { Category } from '../entities/categories.entity';
import { categoriesExtractor } from '../../common/helpers/category-extractor.helper';
import { seed } from '../../common/helpers/pre-load.seed';
import { CategoriesRepository } from '../repository/categories.repository';
@Injectable()
export class CategoriesSeederService {
  constructor(private readonly catRp: CategoriesRepository) {}

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
    return newCategories;
  }
}
