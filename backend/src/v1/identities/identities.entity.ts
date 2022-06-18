import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsIn } from 'class-validator';
import { User } from '../users/user.entity';
import { Verifier } from '../verifiers/verifiers.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity()
export class Identity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsIn(['user', 'verifier'])
  encryptedBy: string;

  @Column()
  encryptedData: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Verifier, (verifier) => verifier.identity)
  verifier: Verifier;

  @AfterInsert()
  logInsert() {}

  @AfterUpdate()
  logUpdate() {}

  @AfterRemove()
  logRemove() {}
}
