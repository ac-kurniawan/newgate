import { AccountModel, AccountStatus, AccountType } from '@newgate/model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @Column()
  password?: string;

  @Column({
    type: 'enum',
    enum: ['ADMIN', 'DEVELOPER'],
  })
  type: AccountType;

  @Column({
    type: 'enum',
    enum: ['ACTIVE', 'INACTIVE'],
  })
  status: AccountStatus;

  @Column()
  scopes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toModel(): AccountModel {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      type: this.type,
      status: this.status,
      scopes: this.scopes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
