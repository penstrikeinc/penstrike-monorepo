import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService, JwtPayloadReturnType } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Users } from 'src/users/entities/user.entity';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() loginUserDto: CreateAuthDto): Promise<JwtPayloadReturnType> {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<Users> {
    return req.user;
  }
}
