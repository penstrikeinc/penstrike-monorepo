import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthPayloadDto } from './dto/auth.dto';
import { CacheGroupEnum } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('login')
  // @UseGuards(LocalGuard)
  async login(@Body() loginUserDto: AuthPayloadDto) {
    const response = await this.authService.login(loginUserDto);
    await this.cacheManager.set(CacheGroupEnum.SESSION, response.access_token);
    return response;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getProfile() {
    const token: string = await this.cacheManager.get(CacheGroupEnum.SESSION);
    return this.authService.findProfile(token);
  }

  @Post('logout')
  async logout() {
    await this.cacheManager.del(CacheGroupEnum.SESSION);
    return { success: true };
  }
}
