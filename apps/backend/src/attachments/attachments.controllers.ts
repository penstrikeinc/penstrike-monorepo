import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AttachmentServices } from './attachments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CustomFileValidator } from './attachments.validator';
import { GetUser } from 'src/auth/decorator/user';
import { IJwtPayload } from 'src/types';
import { join } from 'path';
import { Response } from 'express';

@UseGuards(AuthGuard())
@Controller('attachments')
export class AttachmentsControllers {
  constructor(private readonly attachmentServices: AttachmentServices) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/reports',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}-${file.originalname} `;
          cb(null, filename);
        },
      }),
    }),
  )
  async upload(
    @UploadedFile(new CustomFileValidator())
    attachment: Express.Multer.File,
    @GetUser() user: IJwtPayload,
  ) {
    return this.attachmentServices.uploadAttachment(user.id, attachment);
  }

  @Get('report/:filename')
  async getReportFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<any> {
    const filePath = join(__dirname, '../../uploads/reports', filename);
    res.sendFile(filePath); // Send the file as a response
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.attachmentServices.findOne(id);
  }
}
