import { IsArray, IsISO8601, IsString } from 'class-validator';

export class CreateIdentityRequestDto {
  @IsString()
  accountId: string;

  @IsString()
  userPublicKey: string;

  @IsString()
  name: string;

  @IsString()
  gender: string;

  @IsISO8601()
  dob: string;

  @IsString()
  address: string;

  @IsString()
  ccid: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  nationality: string;

  @IsArray({ each: true })
  faceVector: string;
}
