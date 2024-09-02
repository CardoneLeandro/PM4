import { Category } from 'src/categories/entities/categories.entity';

export const categoriesExtractor = (payload: { name: string; description: string; price: number; stock: number; category: string }[]): Partial<Category[]> | [] => {
  if (!Array.isArray(payload)) {
    return [];
  }
  const extractedCategories: Category[] = payload.map((item) => ({ name: item.category } as Category));
  const uniqueCategories = new Set<string>();
  const categories: Category[] = extractedCategories.filter((category) => {
    if (!uniqueCategories.has(category.name)) {
      uniqueCategories.add(category.name);
      return true;
    }
    return false;
  });

  return categories;
};