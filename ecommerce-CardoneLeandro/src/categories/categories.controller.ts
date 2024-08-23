import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesSeederService } from './seeder/categories-seeder.service';

@Controller('categories')
export class CategoriesController {
constructor(private readonly catSv: CategoriesService,
  private readonly catSeedSv: CategoriesSeederService
) {}

@Post('seeder')
async seedCategories(){ // here we take an arr of string with the names of the categories
    await this.catSeedSv.preload()
    return "categories seeded"
  }

  @Post()
async addCategories(@Body() categoriesNames: string[]){ // here we take an arr of string with the names of the categories
    for (const name of categoriesNames) { // then we pass each name to the service to create a new cartegory
      await this.catSv.addCategory({name}) // here recieves the name of the category and pass to the service
    }
    return "categories seeded"
  }


@Get()
async getCategories() {
  return this.catSv.getCategories();
  
}
}
