import {
  Controller,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Get,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { GetUploadedFilesQuery } from './dto/get-uploaded-files-query.dto';
import { UploadFilesDto } from './dto/upload-files.dto';
import { ImageUploadService } from './file-upload.service';

@ApiTags('upload')
@Controller('upload')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @ApiOkResponse({
    description: 'Upload files to S3',
    type: 'File uploaded successfully',
  })
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['date', 'amount', 'description', 'file', 'purchaseName'], 
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        date: {type: 'string', example: '2021-01-01'},
        amount: {type: 'string', example: '100'},
        description: {type: 'string', example: 'test'},
        purchaseName: {type: 'string', example: 'Iphone'},
      }, 
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile2(
    @UploadedFile('file') file: any,
    @Body() uploadFilesDto: UploadFilesDto,
    @Res() response,
  ) {
    if (!file) {
      throw new BadRequestException('invalid file provided');
    }
    if (file.size > 209715200) {
      throw new BadRequestException('File size too large');
    }
    const { buffer, originalname } = file;
    return this.imageUploadService.uploadFile(
      buffer,
      originalname,
      response,
      uploadFilesDto,
    );
  }

  @ApiOkResponse({
    description: 'Get all uploaded files',
    type: [UploadFilesDto],
  })
  @Get('all-uploads')
  getUploadedFiles(
    @Res() response,
    @Query() params: GetUploadedFilesQuery,
  ) {
    const { offset = 0, limit = 10 } = params;

    return plainToClass(
      UploadFilesDto,
      this.imageUploadService.getAllUploadedFiles(offset, limit, response),
    );
  }



}
