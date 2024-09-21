import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthPayloadDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request, @Body() loginUserDto: AuthPayloadDto) {
    // const user = req.user;
    const response = await this.authService.login(loginUserDto);
    await this.cacheManager.set('access_token', response.access_token);
    return response;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getProfile(@Req() req: Request) {
    // const user = req.user;
    const token: string = await this.cacheManager.get('access_token');
    return this.authService.findProfile(token);
  }

  // @Post('logout')
  // logout(@Res({ passthrough: true }) res: Response) {
  //   console.log('logout calling from backend');

  //   res.clearCookie('access_token');

  //   return { success: true };
  // }

  // @Post('login')
  // @UseGuards(LocalGuard)
  // async login(
  //   @Body() loginUserDto: CreateAuthDto,
  // ): Promise<JwtPayloadReturnType> {
  //   const response = await this.authService.login(loginUserDto);
  //   await this.cacheManager.set('access_token', response.access_token);
  //   return response;
  // }
}
