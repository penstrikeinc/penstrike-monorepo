import { Report } from 'src/reports/entities/report.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('attachment')
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text' })
  destination: string;

  @Column({ type: 'text', name: 'file_name' })
  fileName: string;

  @Column({ type: 'text', name: 'user_id' })
  userId: string;

  @OneToMany(() => User, (user) => user.picture)
  profilePictures: User[];

  @OneToMany(() => Report, (report) => report.reportFile)
  reportFile: Report[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: string;
}
