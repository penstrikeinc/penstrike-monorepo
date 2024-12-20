import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AttachmentsControllers } from './attachments.controllers';
import { AttachmentServices } from './attachments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachments.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    TypeOrmModule.forFeature([Attachment]),
  ],
  controllers: [AttachmentsControllers],
  providers: [AttachmentServices],
  exports: [AttachmentServices],
})
export class AttachmentsModule {}
