import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  assetName: string;

  @IsString()
  @IsNotEmpty()
  targetUrl: string;
}
