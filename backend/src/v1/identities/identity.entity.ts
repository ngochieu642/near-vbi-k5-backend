import { IsArray, IsIn, IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class Identity {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['male', 'female'])
  gender: string;

  @IsISO8601()
  @IsNotEmpty()
  dob: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  ccid: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsNotEmpty()
  @IsArray({ each: true })
  @Type(() => Array)
  faceVector: string;
}
