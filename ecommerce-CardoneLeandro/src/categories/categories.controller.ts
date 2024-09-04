import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesSeederService } from './seeder/categories-seeder.service';
import { AuthHeaderGuard } from 'src/auth/guard/auth-headers.guard';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly catSv: CategoriesService,
    private readonly catSeedSv: CategoriesSeederService,
  ) {}

  @Post('seeder')
  @UseGuards(AuthHeaderGuard)
  async seedCategories() {
    // here we take an arr of string with the names of the categories
    const newCategories = await this.catSeedSv.preload();
    return { newCategories: newCategories };
  }

  @Post()
  async addCategories(@Body() categoriesNames: string[]) {
    // here we take an arr of string with the names of the categories
    const newCategories = [];
    for (const name of categoriesNames) {
      // then we pass each name to the service to create a new cartegory
      newCategories.push(await this.catSv.addCategory({ name })); // here recieves the name of the category and pass to the service
    }
    return newCategories;
  }

  @Get()
  async getCategories() {
    return this.catSv.getCategories();
  }
}
