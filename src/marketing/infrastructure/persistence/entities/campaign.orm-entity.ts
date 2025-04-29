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
import { CampaignStatus } from '../../../domain/enum';

@Entity('campaigns')
export class CampaignEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  internalName: string;

  @Column({ type: 'text', nullable: true })
  internalDescription?: string;

  @Column({ length: 255 })
  publicTitle: string;

  @Column({ type: 'text', nullable: true })
  publicMessage?: string;

  @Column({ type: 'timestamptz', name: 'start_at' })
  startAt: Date;

  @Column({ type: 'timestamptz', name: 'end_at', nullable: true })
  endAt?: Date;

  @Column({ name: 'admin_id', nullable: true })
  adminId?: number;

  @ManyToOne(() => AdminEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'admin_id' })
  admin?: AdminEntity;

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.NotStarted,
  })
  status: CampaignStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
