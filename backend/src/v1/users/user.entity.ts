import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IdentityRequest } from '../identity-requests/identity-request.entity';
import { EncryptedIdentity } from '../encrypted-identities/encrypted-identity.entity';

@Entity()
@Unique(['email'])
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @OneToMany(() => IdentityRequest, (identityRequest) => identityRequest.user)
  identityRequests: IdentityRequest[];

  @OneToOne(() => EncryptedIdentity, (identity) => identity.user) // specify inverse side as a second parameter
  encryptedIdentity: EncryptedIdentity;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with Id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Update User with Id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Remove User with Id: ${this.id}`);
  }
}
