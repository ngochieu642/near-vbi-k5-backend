import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gender, IdentityRequestStatus, Nationality } from '../../shared/type';
import { User } from '../users/users.entity';
import { Verifier } from '../verifiers/verifiers.entity';
import { IsIn } from 'class-validator';

@Entity()
export class IdentityRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: string;

  @Column()
  userPublicKey: string;

  @Column()
  name: string;

  @Column()
  @IsIn(['male', 'female'])
  gender: Gender;

  @Column()
  dob: Date;

  @Column()
  address: string;

  @Column()
  ccid: string;

  @Column()
  phoneNumber: string;

  @Column()
  nationality: Nationality;

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
