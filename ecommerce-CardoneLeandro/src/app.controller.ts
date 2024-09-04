import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CategoriesSeederService } from './categories/seeder/categories-seeder.service';
import { ProductSeederService } from './products/seeder/product-seeder.service';

@Controller()
export class AppController {
<<<<<<< HEAD
  constructor(private readonly appService: AppService) {}
}
=======
  constructor(private readonly appService: AppService,
    
  ) {}

}
>>>>>>> 43f08683d353a78355d56b7f75990ed2bfa75512
