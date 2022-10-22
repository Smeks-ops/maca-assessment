import { Test, TestingModule } from '@nestjs/testing';
import { ImageUploadController } from './file-upload.controller';
import { ImageUploadService } from './file-upload.service';
import { UploadFilesDto } from './dto/upload-files.dto';

describe('ImageUploadController', () => {
  let controller: ImageUploadController;
  let service: ImageUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageUploadController],
      providers: [
        {
          provide: ImageUploadService,
          useValue: {
            upload: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ImageUploadController>(ImageUploadController);
    service = module.get<ImageUploadService>(ImageUploadService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('upload', () => {
    it('should upload a receipt and return the successful upload object', async () => {
      const result = {
        newFileUploadPayload: {
          date: "2021-01-01",
          amount: "100",
          description: "test",
          fileURL: "https://macabucket.s3.amazonaws.com/Screenshot_2022-10-20_11-16-29.png",
          purchaseName: "Iphone",
          id: "35f93496-4873-4b6f-be5d-53deb146d485",
          createdAt: "2022-10-21T17:23:41.791Z",
          updatedAt: "2022-10-21T17:23:41.791Z"
        },
        "message": "File uploaded successfully"      
      };

      const payload = {
        date: '2021-01-01',
        amount: '100',
        description: 'test',
        purchaseName: 'Iphone',
      };

      jest.spyOn(service, 'uploadFile').mockImplementation(async () => result);

      jest.enableAutomock();

      expect(await controller.uploadFile2(UploadFilesDto)).toEqual(result);
    });
  });
});