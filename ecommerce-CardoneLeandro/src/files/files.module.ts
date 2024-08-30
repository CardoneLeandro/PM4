import { Module } from '@nestjs/common';
import { CloudinaryUploadService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryConfig } from 'config/coudinary.config';
import { ProductsService } from 'src/products/products.service';
import { ProductsRepository } from 'src/products/repository/products.repository';

@Module({
  controllers: [FilesController],
  providers: [CloudinaryConfig, CloudinaryUploadService, ProductsService,ProductsRepository],
})
export class FilesModule {}
