import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gender, IdentityRequestStatus, Nationality } from '../../shared/type';
import { User } from '../users/user.entity';
import { Verifier } from '../verifiers/verifier.entity';
import { IsIn } from 'class-validator';

@Entity()
export class IdentityRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @IsIn(['male', 'female'])
  gender: Gender;

  @Column()
  dob: Date;

  @Column()
  ccid: string;

  @Column({ array: true })
  faceVector: string;

  @Column()
  status: IdentityRequestStatus;

  @ManyToOne(() => User, (user) => user.identityRequests)
  user: User;

  @ManyToOne(() => Verifier, (verifier) => verifier.identityRequests)
  verifier: Verifier;

  @AfterInsert()
  logInsert() {}

  @AfterUpdate()
  logUpdate() {}

  @AfterRemove()
  logRemove() {}
}
