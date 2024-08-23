import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository';
import { productsExtractor } from '../../helpers/products-extractor.helper';
import { seed } from '../../utils/pre-load.seed';
import { TLSFormatedDate } from 'src/helpers/date-functions.helper';

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
  constructor(private readonly prodRp: ProductsRepository) {}

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
            status: 'Product allready exists',
          };
          audit.preloadTryFailed += 1;
          audit.productsFailed.push(inform);
        } else {
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
