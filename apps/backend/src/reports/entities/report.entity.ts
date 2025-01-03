import { Attachment } from 'src/attachments/entities/attachments.entity';
import { Pentest } from 'src/pentest/entities/pentest.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Pentest, (pentest) => pentest.report)
  @JoinColumn({ name: 'pentest_id' })
  pentest: Pentest;

  @OneToOne(() => Attachment, (attachment) => attachment.reportFile)
  @JoinColumn({ name: 'report_file_id' })
  reportFile: Attachment;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: string;
}
