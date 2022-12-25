import { AccountModel, AccountStatus, AccountType } from '@newgate/model';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name: "accounts", schema: "public"})
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'email' })
  @Index({ unique: true })
  email: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'password', type: 'varchar' })
  password?: string;

  @Column({ name: 'type', type: 'varchar' })
  type: AccountType;

  @Column({ name: 'status', type: 'varchar' })
  status: AccountStatus;

  @Column({ name: 'scopes' })
  scopes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
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
