import {
  Controller,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UUID } from 'crypto';
import { ExistingProductGuard } from 'src/products/guards/existing-product.guard';
import { IsUUIDPipe } from 'src/common/pipes/isUUID.pipe';
import { CloudinaryUploadService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileSv: CloudinaryUploadService) {}
  @Post('uploadImage/:id')
  @UsePipes(IsUUIDPipe)
  @UseGuards(ExistingProductGuard)
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(@Param('id') id: UUID, file) {
    try {
      return await this.fileSv.updateProductImage(id, file);
    } catch (error) {
      console.error(error);
    }
  }
}
