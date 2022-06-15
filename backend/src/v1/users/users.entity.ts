import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IdentityRequest } from '../identity-requests/identity-requests.entity';

@Entity()
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
