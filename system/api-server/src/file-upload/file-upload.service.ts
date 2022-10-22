import { Res, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { Repository } from 'typeorm';
import { UploadFilesDto } from './dto/upload-files.dto';
import { FileUpload } from './entities/file-upload.entity';

const AWS_S3_BUCKET_NAME =
  process.env.AWS_S3_BUCKET_NAME || 'macabucket';
const s3 = new AWS.S3();
const ACCESS_KEY_ID =  process.env.AWS_ACCESS_KEY_ID 
const SECRET_ACCESS_KEY =  process.env.AWS_SECRET_ACCESS_KEY
AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

@Injectable()
export class ImageUploadService {
  constructor(
    @InjectRepository(FileUpload)
    private fileUploadRepository: Repository<FileUpload>,
  ) {}

  async uploadFile(
    imageBuffer: Buffer,
    fileName: string,
    @Res() res,
   uploadFilesDto: UploadFilesDto,) {

    // Setting up S3 upload parameters
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Body: imageBuffer,
      Key: fileName,
      ACL: 'public-read',
    };

    const v = this.fileUploadRepository;

    // Uploading files to the bucket
    try {
      s3.upload(params, async function (err, data) {

        if (data) {

          const exist = await v.findOne({
            where: { 
              fileURL: data.Location,
              purchaseName: uploadFilesDto.purchaseName,
            },
          });
          if (exist) {
            return res.status(400).json({
              message: 'Purchase receipt already exists',
            });
          }

          // save location of the file to the db
          const newFileUploadPayload = new FileUpload();
          newFileUploadPayload.date = uploadFilesDto.date;
          newFileUploadPayload.amount = uploadFilesDto.amount;
          newFileUploadPayload.description = uploadFilesDto.description;
          newFileUploadPayload.fileURL = data.Location;
          newFileUploadPayload.purchaseName = uploadFilesDto.purchaseName;
  
          await v.save(newFileUploadPayload);

          return res.status(201).json({ 
            newFileUploadPayload,
            message: 'File uploaded successfully' 
          });
        }
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
   
  }

  async getAllUploadedFiles(offset: number, limit: number) {

    const query = await this.fileUploadRepository
      .createQueryBuilder('fileUpload')
      .skip(offset)
      .take(limit);
    return query.getMany();
  }


}
