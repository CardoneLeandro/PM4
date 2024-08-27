import { Repository, DataSource } from 'typeorm';
import { Category } from '../entities/categories.entity';
import { Injectable } from '@nestjs/common';
//here we use the decorator @EntityRepository to declare this file ass a class "repository"
//here we can use all methos of the class "Repository" {find, create, save, update, delete}
@Injectable()
export class CategoriesRepository extends Repository<Category> {
  //here declarate the repository as "CategoriesRepository" as an extension of the class "Repository" with the entity "Category"

  // knowing the decorator "@EntityRepository" is deprecated, now we need to use the costructor
  // passing as parameter DataSource from TypeORM
  // using the "super()" we call the constructor of the class "Repository"
  // and passing as parameter the entity "Category" the the constructor of the class "Repository"
  constructor(private dSource: DataSource) {
    super(Category, dSource.getRepository(Category).manager);
  }

  async getCategories(): Promise<Category[]> {
    // here call the method "find" on this repository
    return await this.find(); // where return the result
  }

  async addCategory(name: string): Promise<Category> {
    const newCategory = this.create({ name });
    await this.save(newCategory);
    return newCategory;
  }
}
