import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
constructor(private readonly categoriesService: CategoriesService) {}

@Post('seeder')
async seedCategories(@Body() categoriesNames: string[]){ // here we take an arr of string with the names of the categories
    for (const name of categoriesNames) { // then we pass each name to the service to create a new cartegory
      await this.categoriesService.addCategory({name}) // here recieves the name of the category and pass to the service
    }
    return "categories seeded"
  }


@Get()
async getCategories() {
  return this.categoriesService.getCategories();
  
}
}
