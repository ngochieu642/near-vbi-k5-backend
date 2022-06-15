import { Type } from 'class-transformer';
import { IsArray, IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateIdentityRequestDto {
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsString()
  @IsNotEmpty()
  userPublicKey: string;

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
  address: string;

  @IsString()
  @IsNotEmpty()
  ccid: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  nationality: 'Vietnam';

  @IsNotEmpty()
  @IsArray({ each: true })
  @Type(() => Array)
  faceVector: string;
}
