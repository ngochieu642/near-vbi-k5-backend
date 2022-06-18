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
  faceVector: number[][];

  constructor(
    name: string,
    gender: string,
    dob: Date,
    address: string,
    ccid: string,
    phoneNumber: string,
    nationality: string,
    faceVector: number[][],
  ) {
    this.name = name;
    this.gender = gender;
    this.dob = dob;
    this.address = address;
    this.ccid = ccid;
    this.phoneNumber = phoneNumber;
    this.nationality = nationality;
    this.faceVector = faceVector;
  }
}
