import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JwtPayloadReturnType {
  access_token: string;
  user: IUser;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginUserDto: AuthPayloadDto): Promise<JwtPayloadReturnType> {
    const { password, email } = loginUserDto;
    const userFind = await this.usersService.findOne(email);
    const isMatch = await bcrypt.compare(password, userFind.password);

    if (!userFind) {
      throw new BadRequestException(
        'invalid credentials provided please check email',
      );
    }
    if (!isMatch) {
      throw new UnauthorizedException(
        'invalid credentials provided please check password',
      );
    }

    const payload = { email: userFind.email, id: userFind.id };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });

    return {
      access_token,
      user: userFind,
    };
  }

  async findProfile(cookie: string) {
    try {
      const jwtVerify = await this.jwtService.verifyAsync(cookie, {
        secret: process.env.JWT_SECRET,
      });
      if (!jwtVerify) {
        throw new UnauthorizedException('unauthorized access');
      }
      const user = await this.usersService.findOne(jwtVerify.email);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;

      return rest;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new UnauthorizedException('unauthorized access');
    }
  }
}
