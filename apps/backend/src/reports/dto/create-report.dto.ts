import { IsString, IsUUID } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsUUID()
  pentest: string;

  @IsString()
  @IsUUID()
  attachment: string;
}
