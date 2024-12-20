import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AttachmentServices } from './attachments.service';

@UseGuards(AuthGuard())
@Controller('attachments')
export class AttachmentsControllers {
  constructor(private readonly attachmentServices: AttachmentServices) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attachmentServices.findOne(id);
  }

  // @Get()
  // findAll(@GetActiveContext() { companyId }: IGetActiveContext): Promise<Attachment[]> {
  //   return this.attachmentServices.findAllByCompanyId(companyId);
  // }
}
