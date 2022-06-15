import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IdentityRequest } from '../identity-requests/identity-requests.entity';

@Entity()
export class Verifier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => IdentityRequest, (identityRequest) => identityRequest.verifier)
  identityRequests: IdentityRequest[];

  @AfterInsert()
  logInsert() {}

  @AfterUpdate()
  logUpdate() {}

  @AfterRemove()
  logRemove() {}
}
