import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFindingDto } from './dto/create-pentest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finding } from './entities/finding.entity';

@Injectable()
export class FindingService {
  constructor(
    @InjectRepository(Finding)
    private readonly findingRepository: Repository<Finding>,
  ) {}

  async create({
    createFindingDto,
    userId,
  }: {
    createFindingDto: CreateFindingDto;
    userId: string;
  }): Promise<Finding> {
    const payload = {
      ...createFindingDto,
      user: { id: userId },
      pentest: { id: createFindingDto.pentest },
    };

    const newFinding = this.findingRepository.create(payload);

    if (!newFinding) {
      throw new BadRequestException('Unable to create new finding');
    }

    return await this.findingRepository.save(newFinding);
  }

  async findAll() {
    const findings = await this.findingRepository.find({
      relations: { pentest: { assignedBy: true }, user: true },
    });
    return {
      items: findings,
      meta: {
        count: findings.length,
      },
    };
  }

  async findOne(id: string) {
    return await this.findingRepository.findOne({
      where: { id },
    });
  }
}
