import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/products.entity';
import { ProductSeederService } from './seeder/product-seeder.service';
import { AuthHeaderGuard } from 'src/auth/guard/auth-headers.guard';
import { IsUUIDPipe } from 'src/common/pipes/isUUID.pipe';
import { UUID } from 'crypto';
import { ImageInterceptor } from 'src/files/interceptor/image.interceptor';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddCategoryIdonRequestInterceptor } from './interceptors/addCategoryIdOnReq.interceptor';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly prodSv: ProductsService,
    private readonly prodSeedSv: ProductSeederService,
  ) {}

  @Post('seeder')
  @UseGuards(AuthHeaderGuard)
  async seedProducts(): Promise<any> {
    try {
      const audit = await this.prodSeedSv.preload();
      return audit;
    } catch {
      throw new Error('An error occurred during the seeding process');
    }
  }

  @Get()
  async getProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): Promise<Product[]> {
    const p: number =
      isNaN(parseInt(page, 10)) || parseInt(page, 10) < 1
        ? 1
        : parseInt(page, 10);
    const l: number =
      isNaN(parseInt(limit, 10)) || parseInt(limit, 10) < 1
        ? 5
        : parseInt(limit, 10);

    try {
      return await this.prodSv.getProducts(p, l);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @Get(':id') //=> INCORPORAR UN PIPE PARA VALIDAR EL ID
  async getProductById(@Param('id', new IsUUIDPipe()) id: string): Promise<Product | null> {
    try {
      const p = await this.prodSv.getProductById(id);
      if (!p) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return p;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @Post() //=> INCORPORAR UN PIPE PARA VALIDAR EL ID ( EN ESTE CASO REVISAR SI CORRESPONDE PARA EL ID DE USUARIO, SI ES QUE NO VALIDA POR TOKEN)
  @UseGuards(AuthHeaderGuard)
  @UseInterceptors(AddCategoryIdonRequestInterceptor)
  @UseInterceptors(ImageInterceptor)
  @UsePipes(new DTOValidationPipe())
  async createNewProduct(
    @Body() data: CreateProductDto,
  ): Promise<{ id: string } | null> {
    try {
      const newProduct: Product = await this.prodSv.createProduct(data);
      if (!newProduct) {
        throw new Error('An error occurred during the creation process');
      }
      return newProduct ;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @Put(':id') //=> INCORPORAR UN PIPE PARA VALIDAR EL ID
  @UseGuards(AuthHeaderGuard)
  @UsePipes(new DTOValidationPipe())
  async updateProduct(
    @Param('id', new IsUUIDPipe()) id: UUID,
    @Body() data: UpdateProductDto,
  ): Promise<Partial<Product> | null> {
    try {
      const upP: string = await this.prodSv.updateProduct(id, data);
      if (!upP) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return { id: upP, ...data };
    } catch (e) {
      console.error(e);
      console.log("CARDONE =========> updateProduct error message", e.message);
      throw e;
    }
  }

  @Delete(':id') //=> INCORPORAR UN PIPE PARA VALIDAR EL ID
  @UseGuards(AuthHeaderGuard)
  async deleteProduct
  (@Param('id', new IsUUIDPipe()) id: UUID): Promise<{ id: string } | null> {
    try {
      const delP: string = await this.prodSv.deleteProduct(id);
      if (!delP) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return { id: delP };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
//
