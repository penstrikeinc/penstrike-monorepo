import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachments.entity';
import { TConfigService } from 'src/types';
import { InjectRepository } from '@nestjs/typeorm';
import { AttachmentTypesEnum } from './dto/type';

@Injectable()
export class AttachmentServices {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
    private readonly configService: ConfigService<TConfigService>,
  ) {}

  async findOne(id: string) {
    const data = await this.attachmentRepository.findOneBy({ id });
    if (!data) {
      throw new InternalServerErrorException(
        `No attachment found with the id: ${id}`,
      );
    }
    return data;
  }
  async uploadAttachment(userId: string, attachment: Express.Multer.File) {
    const payload = {
      userId,
      fileName: attachment.filename,
      type: AttachmentTypesEnum.REPORTS,
      destination: attachment.destination,
    };

    const data = this.attachmentRepository.create(payload);
    return this.attachmentRepository.save(data);
  }
}
