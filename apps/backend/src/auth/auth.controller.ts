import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService, IUser, JwtPayloadReturnType } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginUserDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<JwtPayloadReturnType> {
    const response = await this.authService.login(loginUserDto);

    res.cookie('access_token', response.access_token, {
      httpOnly: true,
    });

    return response;
  }

  // @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request): Promise<IUser> {
    const cookie = req.cookies['access_token'];
    return this.authService.findProfile(cookie);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    console.log('logout calling from backend');

    res.clearCookie('access_token');

    return { success: true };
  }
}
