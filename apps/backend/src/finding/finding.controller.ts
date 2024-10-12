import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateFindingDto } from './dto/create-pentest.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/decorator/user';
import { IJwtPayload } from 'src/types';
import { FindingService } from './finding.service';

@UseGuards(JwtAuthGuard)
@Controller('finding')
export class FindingController {
  constructor(private readonly findingService: FindingService) {}

  @Post()
  create(
    @Body() createFindingDto: CreateFindingDto,
    @GetUser() user: IJwtPayload,
  ) {
    return this.findingService.create({
      createFindingDto,
      userId: user.id,
    });
  }

  @Get()
  findAll() {
    return this.findingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findingService.findOne(id);
  }
}
