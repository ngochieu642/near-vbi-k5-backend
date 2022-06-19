import { IsArray, IsDate, IsIn, IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class Identity {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['male', 'female'])
  gender: string;

  @IsDate()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  ccid: string;

  @IsNotEmpty()
  @IsArray({ each: true })
  @Type(() => Array)
  faceVector: number[][];

  constructor(name: string, gender: string, dob: Date, ccid: string, faceVector: number[][]) {
    this.name = name;
    this.gender = gender;
    this.dob = dob;
    this.ccid = ccid;
    this.faceVector = faceVector;
  }
}
