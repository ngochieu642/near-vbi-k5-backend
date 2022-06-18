import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IdentityRequest } from '../identity-requests/identity-request.entity';
import { Identity } from '../encrypted-identities/encrypted-identity.entity';

@Entity()
@Unique(['username'])
export class Verifier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => IdentityRequest, (identityRequest) => identityRequest.verifier)
  identityRequests: IdentityRequest[];

  @OneToMany(() => Identity, (identity) => identity.verifier)
  identity: Identity[];

  @AfterInsert()
  logInsert() {}

  @AfterUpdate()
  logUpdate() {}

  @AfterRemove()
  logRemove() {}
}
