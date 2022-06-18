import { IsString } from 'class-validator';

export class ApproveRequestResponseDto {
  @IsString()
  public hash: string;

  constructor(hash: string) {
    this.hash = hash;
  }
}
