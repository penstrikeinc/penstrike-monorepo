import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { UserTypeEnum } from 'src/types';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  @IsEnum(UserTypeEnum)
  userType: UserTypeEnum;
}
