import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FaceVector, Gender, IdentityRequestStatus, Nationality } from '../shared/type';
import { User } from '../users/users.entity';

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

  @Column()
  faceVector: FaceVector;

  @Column()
  status: IdentityRequestStatus;

  @ManyToOne(() => User, (user) => user.identityRequests)
  user: User;

  @AfterInsert()
  logInsert() {}

  @AfterUpdate()
  logUpdate() {}

  @AfterRemove()
  logRemove() {}
}
