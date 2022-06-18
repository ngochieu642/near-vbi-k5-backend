import { IsString } from 'class-validator';

export class CreateVerifierDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
