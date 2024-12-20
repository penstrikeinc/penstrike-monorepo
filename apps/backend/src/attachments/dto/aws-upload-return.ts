import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { z } from 'zod';

export enum TypesEnum {
  USER = 'USER',
  COMPANY = 'COMPANY',
  PRODUCT = 'PRODUCT',
}

const TypesEnumValues = ['USER', 'COMPANY', 'PRODUCT'] as const;
export const ZTypesEnum = z.enum(TypesEnumValues);
export type TTypesEnum = z.infer<typeof ZTypesEnum>;

export class AWSUploadReturnDTO {
  @IsEnum(TypesEnum)
  @IsNotEmpty()
  type: TypesEnum;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsNotEmpty()
  fileName: string;
}
