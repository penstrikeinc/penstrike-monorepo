import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum AttachmentTypesEnum {
  REPORTS = 'REPORTS',
}

export class AttachmentUploadReturnDTO {
  @IsEnum(AttachmentTypesEnum)
  @IsNotEmpty()
  type: AttachmentTypesEnum;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsNotEmpty()
  fileName: string;
}
