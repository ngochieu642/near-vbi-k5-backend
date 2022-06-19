import { Type } from 'class-transformer';
import { IsArray, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateIdentityRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  gender: 'male' | 'female';

  @IsISO8601()
  @IsNotEmpty()
  dob: string;

  @IsString()
  @IsNotEmpty()
  ccid: string;

  @IsNotEmpty()
  @IsArray({ each: true })
  @Type(() => Array)
  faceVector: string;
}
