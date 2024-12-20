import { Attachment } from 'src/attachments/entities/attachments.entity';
import { Pentest } from 'src/pentest/entities/pentest.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Pentest, (pentest) => pentest.user)
  @JoinColumn({ name: 'pentest_id' })
  pentest: Pentest;

  @ManyToOne(() => Attachment, (attachment) => attachment.profilePictures, {
    cascade: true,
  })
  @JoinColumn({ name: 'report_file' })
  reportFile: Attachment;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: string;
}
