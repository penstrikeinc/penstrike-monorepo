import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  massage: string;

  @IsString()
  @IsNotEmpty()
  findingId: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}
