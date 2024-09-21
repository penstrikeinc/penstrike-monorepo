import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Inject,
} from '@nestjs/common';
import { AuthService, IUser, JwtPayloadReturnType } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginUserDto: CreateAuthDto,
  ): Promise<JwtPayloadReturnType> {
    const response = await this.authService.login(loginUserDto);
    await this.cacheManager.set('access_token', response.access_token);
    return response;
  }

  // @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(): Promise<IUser> {
    const token: string = await this.cacheManager.get('access_token');
    return this.authService.findProfile(token);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    console.log('logout calling from backend');

    res.clearCookie('access_token');

    return { success: true };
  }
}
