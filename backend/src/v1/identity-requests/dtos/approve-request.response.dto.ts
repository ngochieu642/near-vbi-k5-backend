import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApproveRequestResponseDto {
  @IsNotEmpty()
  @IsString()
  public hash: string;

  @IsNotEmpty()
  @IsNumber()
  public encryptedDataId: number;

  constructor(encryptedDataId: number, hash: string) {
    this.encryptedDataId = encryptedDataId;
    this.hash = hash;
  }
}
