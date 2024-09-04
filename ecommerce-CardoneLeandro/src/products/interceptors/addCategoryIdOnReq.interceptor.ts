import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CategoriesRepository } from 'src/categories/repository/categories.repository';

@Injectable()
export class AddCategoryIdonRequestInterceptor implements NestInterceptor {
  constructor(private readonly categoryRp: CategoriesRepository) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const productCategory = request.body.category;
    console.log(
      'CARDONE =========> addCategoryIdonRequestInterceptor!!!!!!!!!!!!!!!request.body',
      request.body,
    );
    console.log(
      'CARDONE =========> addCategoryIdonRequestInterceptor, productCategory',
      productCategory,
    );
    if (!productCategory) {
      throw new BadRequestException('category is required');
    }
    const category = await this.findCategoryByName(productCategory);
    console.log(
      'CARDONE =========> addCategoryIdonRequestInterceptor!!!!!!!!!!, category',
      typeof category.id,
      category,
    );
    if (!category) {
      throw new BadRequestException('Category not found or does not exist');
    }
    //delete request.body.category
    request.body.category = category;
    console.log(
      'CARDONE =========> addCategoryIdonRequestInterceptor, request',
      request.body,
    );
    return next.handle();
  }

  async findCategoryByName(name: string) {
    try {
      const category = await this.categoryRp.findOne({ where: { name } });
      return category;
    } catch (error) {
      console.log(
        'CARDONE =========> addCategoryIdonRequestInterceptor catch',
        error,
      );
      throw new BadRequestException(`Error finding category: ${error.message}`);
    }
  }
}
