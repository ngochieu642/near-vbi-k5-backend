import { IsString } from 'class-validator';
import { IdentityRequestStatus } from '../../../shared/type';

export class ApproveRequestDto {
  @IsString()
  approve: IdentityRequestStatus;
}
