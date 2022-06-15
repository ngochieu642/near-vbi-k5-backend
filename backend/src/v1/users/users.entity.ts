import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
