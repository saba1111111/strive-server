import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdminEntity } from './admin.orm-entity';
import { LlmModels } from '../../../../common/application/enum';

@Entity('llm_responses')
export class LlmResponseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'admin_id', nullable: true })
  adminId?: number;

  @ManyToOne(() => AdminEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'admin_id' })
  admin?: AdminEntity;

  @Column({ type: 'text' })
  prompt: string;

  @Column({ type: 'text' })
  response: string;

  @Column({ type: 'enum', enum: LlmModels })
  model: LlmModels;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
