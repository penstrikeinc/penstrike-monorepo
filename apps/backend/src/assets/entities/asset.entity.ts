import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('asset')
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  assetName: string;

  @Column()
  targetUrl: string;

  @ManyToOne(() => User, (user) => user.asset)
  @JoinColumn({ name: 'user' })
  user: User;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: string;
}
