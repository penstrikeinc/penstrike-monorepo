import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterCommentDto {
  @IsString()
  @IsUUID()
  findingId: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
