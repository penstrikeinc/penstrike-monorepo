import { Pentest } from 'src/pentest/entities/pentest.entity';
import { AssetStatusEnum } from 'src/types';
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
  name: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  type: string;

  @Column({
    default: AssetStatusEnum.ACTIVE,
    enum: AssetStatusEnum,
    type: 'enum',
  })
  status: AssetStatusEnum;

  @ManyToOne(() => User, (user) => user.asset)
  user: User;

  @ManyToOne(() => Pentest, (pentest) => pentest.assets)
  @JoinColumn({ name: 'pentest_id' })
  pentest: Pentest;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: string;
}
