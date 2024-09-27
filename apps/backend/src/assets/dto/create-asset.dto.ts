import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AssetStatusEnum } from 'src/types';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  status: AssetStatusEnum;
}
