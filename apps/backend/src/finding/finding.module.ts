import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindingController } from './finding.controller';
import { FindingService } from './finding.service';
import { Finding } from './entities/finding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Finding])],
  controllers: [FindingController],
  providers: [FindingService],
})
export class FindingModule {}
