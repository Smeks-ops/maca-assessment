import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UploadFilesDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  amount: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;
}
