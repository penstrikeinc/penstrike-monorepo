import { Pentest } from 'src/pentest/entities/pentest.entity';
import { CategoryEnum, FindingStateEnum, SeverityEnum } from 'src/types';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('finding')
export class Finding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ enum: FindingStateEnum, default: FindingStateEnum.PENDING_FIX })
  state: FindingStateEnum;

  @Column({ enum: SeverityEnum })
  severity: SeverityEnum;

  @Column({ enum: CategoryEnum })
  category: CategoryEnum;

  @Column()
  host: string;

  @Column()
  impact: string;

  @Column()
  reproduce: string;

  @Column()
  concept: string;

  @ManyToOne(() => Pentest, (pentest) => pentest.finding)
  pentest?: Pentest;

  @ManyToOne(() => User, (user) => user.pentest)
  user: User;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: string;
}
