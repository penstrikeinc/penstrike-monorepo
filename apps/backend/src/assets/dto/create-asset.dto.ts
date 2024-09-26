import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  assetsName: string;

  @IsString()
  @IsNotEmpty()
  targetUrl: string;
}
