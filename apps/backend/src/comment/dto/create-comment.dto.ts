import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  massage: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  findingId: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
