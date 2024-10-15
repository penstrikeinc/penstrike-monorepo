import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterCommentDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  findingId: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
