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
import { EncryptedIdentity } from '../encrypted-identities/encrypted-identity.entity';

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

  @OneToMany(() => EncryptedIdentity, (identity) => identity.verifier)
  identity: EncryptedIdentity[];

  @AfterInsert()
  logInsert() {}

  @AfterUpdate()
  logUpdate() {}

  @AfterRemove()
  logRemove() {}
}
