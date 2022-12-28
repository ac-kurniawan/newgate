import { KongModel } from '@newgate/model';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'kong', schema: 'public' })
export class KongEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'account_id' })
  @Index({ unique: true })
  accountId: string;

  @Column({ name: 'base_url', nullable: false })
  baseUrl: string;

  @Column({ name: 'port', nullable: false })
  port: number;

  @Column({ name: 'key', nullable: true })
  key?: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'alias', nullable: true })
  alias?: string;

  @Column({ name: 'group', nullable: true })
  group?: string;

  @Column({ name: 'tags', nullable: true })
  tags?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}

export const kongEntityCoverter = {
  toModel: (entity: KongEntity): KongModel => {
    return {
      id: entity.id,
      accountId: entity.accountId,
      baseUrl: entity.baseUrl,
      port: entity.port,
      key: entity.key,
      name: entity.name,
      alias: entity.alias,
      group: entity.alias,
      tags: entity.tags,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  },
  fromModel: (model: KongModel): KongEntity => {
    return {
      id: model.id,
      accountId: model.accountId,
      baseUrl: model.baseUrl,
      port: model.port,
      key: model.key,
      name: model.name,
      alias: model.alias,
      group: model.alias,
      tags: model.tags,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  },
};
