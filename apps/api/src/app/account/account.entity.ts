import { AccountModel, AccountStatus, AccountType } from '@newgate/model';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column()
  password?: string;

  @Column()
  type: AccountType;

  @Column()
  status: AccountStatus;

  @Column()
  scopes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export const accountEntityConverter = {
  toModel: (entity: AccountEntity): AccountModel => {
    return {
      id: entity.id,
      email: entity.email,
      password: entity.password,
      fullName: entity.fullName,
      type: entity.type,
      status: entity.status,
      scopes: entity.scopes,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  },
};
