import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { AWSUploadReturnDTO, TypesEnum } from './dto/aws-upload-return';
import { Attachment } from './entities/attachments.entity';
import { TConfigService } from 'src/types';
import { InjectRepository } from '@nestjs/typeorm';

type TCompanyDest = {
  destination: 'companies' | 'products';
  companyId: string;
};

type TUserDest = {
  destination: 'users';
};

type TDestination = TCompanyDest | TUserDest;

type TUploadCompanyAssetParam = {
  userId: string;
  attachment: Express.Multer.File;
  companyId: string;
};

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

  // async uploadToAws(
  //   attachment: Express.Multer.File,
  //   dest: TDestination,
  // ): Promise<AWSUploadReturnDTO> {
  //   const s3client = new S3Client({
  //     endpoint: this.configService.get('AWS_ENDPOINT'),
  //     region: this.configService.get('AWS_BUCKET_REGION'),
  //     credentials: {
  //       accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
  //       secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
  //     },
  //   });

  //   let type = null;
  //   let directory = '';
  //   let itemId = null;
  //   if (dest.destination === 'companies') {
  //     type = TypesEnum.COMPANY;
  //     directory = dest.destination;
  //     itemId = dest.companyId;
  //   }
  //   if (dest.destination === 'products') {
  //     type = TypesEnum.PRODUCT;
  //     directory = dest.destination;
  //     itemId = dest.companyId;
  //   }
  //   if (dest.destination === 'users') {
  //     type = TypesEnum.USER;
  //     directory = 'user-assets';
  //     itemId = null;
  //   }

  //   const destination = `${directory}${itemId ? `/${itemId}` : ''}`;
  //   const fileName = `${attachment.originalname}-${new Date().toISOString()}-${uuid()}`;
  //   const key = `${destination}/${fileName}`;

  //   try {
  //     await s3client.send(
  //       new PutObjectCommand({
  //         Bucket: this.configService.get('AWS_BUCKET_NAME'),
  //         Key: key,
  //         ContentType: 'image/jpeg',
  //         Body: attachment.buffer,
  //         ACL: 'public-read',
  //       }),
  //     );

  //     return { destination, fileName, type };
  //   } catch (err) {
  //     throw new Error(`Unable to upload photo`);
  //   }
  // }

  async uploadUserAsset(userId: string, attachment: Express.Multer.File) {
    console.log({ userId, attachment });
    // const file = await this.uploadToAws(attachment, { destination: 'users' });
    // if (!file) {
    //   throw new InternalServerErrorException(`Unable to upload file`);
    // }
    // const data = this.attachmentRepository.create({
    //   ...file,
    //   userId,
    // });
    // if (!data) {
    //   throw new InternalServerErrorException(`Unable to upload file`);
    // }
    // return this.attachmentRepository.save(data);
  }

  async uploadCompanyAsset(param: TUploadCompanyAssetParam) {
    // const { userId, attachment, companyId } = param;
    // const file = await this.uploadToAws(attachment, {
    //   destination: 'companies',
    //   companyId,
    // });
    // if (!file) {
    //   throw new InternalServerErrorException(`Unable to upload file`);
    // }
    // const data = this.attachmentRepository.create({
    //   ...file,
    //   userId,
    // });
    // if (!data) {
    //   throw new InternalServerErrorException(`Unable to upload file`);
    // }
    // return this.attachmentRepository.save(data);
  }

  // async bulkUpload(
  //   userId: string,
  //   attachments: Array<Express.Multer.File>,
  //   dest: TCompanyDest,
  // ) {
  //   const uploads = attachments.map(async (attachment) => {
  //     const file = await this.uploadToAws(attachment, dest);

  //     if (!file) {
  //       throw new InternalServerErrorException(`Unable to upload file`);
  //     }

  //     const data = this.attachmentRepository.create({
  //       ...file,
  //       userId,
  //     });

  //     const res = await this.attachmentRepository.save(data);
  //     if (!res) {
  //       throw new InternalServerErrorException(`Unable to upload file`);
  //     }

  //     return res;
  //   });

  //   try {
  //     const ret = await Promise.allSettled(uploads);
  //     return ret;
  //   } catch (error) {
  //     throw new InternalServerErrorException('Error processing attachments');
  //   }
  // }

  async deleteattachmentById(id: string) {
    const result = await this.attachmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't delete an attachment`);
    }
    return result;
  }
}
