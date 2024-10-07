import { Asset } from 'src/assets/entities/asset.entity';
import { Pentest } from 'src/pentest/entities/pentest.entity';
import { UserTypeEnum } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({
    type: 'enum',
    enum: UserTypeEnum,
    default: UserTypeEnum.CUSTOMER,
    name: 'user_type',
  })
  userType: UserTypeEnum;

  @OneToMany(() => Asset, (asset) => asset.user)
  @JoinColumn({ name: 'asset_id' })
  asset: Asset;

  @OneToMany(() => Pentest, (pentest) => pentest.user)
  @JoinColumn({ name: 'pentest_id' })
  pentest: Pentest;

  @OneToMany(() => Pentest, (pentest) => pentest.assignedBy)
  assignedPentests?: Pentest[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: string;
}
