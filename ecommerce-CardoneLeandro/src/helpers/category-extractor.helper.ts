import { Category } from "src/categories/entities/categories.entity"


export const categoriesExtractor= (payload):Partial<Category[]> | [] => {
    const seed = payload.JSON
    const extractedCategories:Category[] = seed.map((seed)=>seed.category)
    let categories = [] as Category[]
    for (let i = 0; i < extractedCategories.length; i++) {
        if(!categories.includes(extractedCategories[i])){
            categories.push(extractedCategories[i])
        }
    }
    return categories
}
