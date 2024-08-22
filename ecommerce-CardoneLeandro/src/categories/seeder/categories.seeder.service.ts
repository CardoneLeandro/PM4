import { Injectable } from "@nestjs/common";
import { Category } from "../entities/categories.entity";
import { CategoriesRepository } from "../repository/categories.repository";
import { categoriesExtractor } from "../../../helpers/category-extractor.helper"
import { seed } from "../../../utils/pre-load.seed"; 



@Injectable()
export class CategoriesSeederService {
constructor(
    private readonly catRp: CategoriesRepository) {}

    async preload(){
        const seedOfCategories:Category[] = categoriesExtractor(seed)
        if(seedOfCategories.length === 0) return
        const categories:Category[] = await this.catRp.getCategories()
        const newCategories:Category[] = seedOfCategories.filter(category => !categories.find(cat => cat.name === category.name))
        await newCategories.forEach(cat => { this.catRp.addCategory(cat.name)} )
        return alert(`categories seeded`)	
    }
}