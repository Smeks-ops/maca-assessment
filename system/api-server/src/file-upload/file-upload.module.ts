import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUpload } from './entities/file-upload.entity';
import { ImageUploadController } from './file-upload.controller';
import { ImageUploadService } from './file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileUpload])],
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
