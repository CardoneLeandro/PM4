import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository';
import { productsExtractor } from '../../common/helpers/products-extractor.helper';
import { seed } from '../../common/helpers/pre-load.seed';
import { TLSFormatedDate } from 'src/common/utils/date-functions.util';
import { Category } from 'src/categories/entities/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface preloadDetail {
  product: string;
  date: string;
  status: string;
}

interface preloadAudit {
  statusMessage: string;
  preloadDate: string;
  productsSeededSuccessfully: number;
  productsSeeded: preloadDetail[];
  preloadTryFailed: number;
  productsFailed: preloadDetail[];
}
@Injectable()
export class ProductSeederService {
  constructor(
    private readonly prodRp: ProductsRepository,
    @InjectRepository(Category)
    private readonly catRp: Repository<Category>,
  ) {}

  async preload() {
    let audit: preloadAudit = {
      statusMessage: '',
      preloadDate: '',
      productsSeededSuccessfully: 0,
      productsSeeded: [],
      preloadTryFailed: 0,
      productsFailed: [],
    };

    const extractedProducts = productsExtractor(seed);
    if (!extractedProducts) {
      audit.statusMessage = 'No products to seed';
      audit.preloadDate = TLSFormatedDate();
      return audit;
    }

    for (const prod of extractedProducts) {
      try {
        const existingProd = await this.prodRp.findOne({
          where: { name: prod.name },
        });
        if (existingProd) {
          let inform: preloadDetail = {
            product: prod.name,
            date: TLSFormatedDate(),
            status: 'Product already exists',
          };
          audit.preloadTryFailed += 1;
          audit.productsFailed.push(inform);
        } else {
          // Verifica si la categoría existe
          const category = await this.catRp.findOne({
            where: { name: prod.category.name },
          });
          if (!category) {
            let inform: preloadDetail = {
              product: prod.name,
              date: TLSFormatedDate(),
              status: 'Category does not exist',
            };
            audit.preloadTryFailed += 1;
            audit.productsFailed.push(inform);
            continue;
          }

          // Asigna la categoría existente al producto
          prod.category = category;
          console.log('CARDONE =========>SEEDER PROD.CATEGORY', prod.category);

          const prodSeeded = await this.prodRp.addProduct(prod);
          let inform: preloadDetail = {
            product: prodSeeded.name,
            date: TLSFormatedDate(),
            status: 'Product seeded successfully',
          };
          audit.productsSeededSuccessfully += 1;
          audit.productsSeeded.push(inform);
        }
      } catch (e) {
        let inform: preloadDetail = {
          product: prod.name,
          date: TLSFormatedDate(),
          status: `Error: ${e.message}`,
        };
        audit.preloadTryFailed += 1;
        audit.productsFailed.push(inform);
      }
    }
    audit.statusMessage = 'Preload successfully finished';
    audit.preloadDate = TLSFormatedDate();

    return audit;
  }
}
