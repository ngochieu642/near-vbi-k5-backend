import { IsIn, IsString } from 'class-validator';
import { IdentityRequestStatus } from '../../../shared/type';

export class ApproveRequestDto {
  @IsString()
  @IsIn(['approved', 'rejected'])
  approve: IdentityRequestStatus;
}
