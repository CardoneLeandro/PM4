import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CategoriesSeederService } from './categories/seeder/categories-seeder.service';
import { ProductSeederService } from './products/seeder/product-seeder.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    
  ) {}

}