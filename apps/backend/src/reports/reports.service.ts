import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttachmentServices } from 'src/attachments/attachments.service';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,

    private readonly attachmentServices: AttachmentServices,
  ) {}

  async create(createReportDto: CreateReportDto) {
    const { pentest, attachment } = createReportDto;
    const report = this.reportRepository.create({
      pentest: { id: pentest },
      reportFile: { id: attachment },
    });
    const result = await this.reportRepository.save(report);
    return result;
  }

  async findAll() {
    const reports = await this.reportRepository.find({
      relations: { pentest: true, reportFile: true },
    });

    return {
      items: reports,
      meta: {
        count: reports.length,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
