import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginUserDto: CreateAuthDto): Promise<{ access_token: string }> {
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
    });

    return {
      access_token,
      ...userFind,
    };
  }
}
