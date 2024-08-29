import { Module } from '@nestjs/common';
import { CloudinaryUploadService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryConfig } from 'config/coudinary.config';

@Module({
  controllers: [FilesController],
  providers: [CloudinaryConfig, CloudinaryUploadService],
})
export class FilesModule {}
