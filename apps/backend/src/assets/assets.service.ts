import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Repository } from 'typeorm';
import { IAssetBE } from 'src/types';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetService: Repository<Asset>,
  ) {}

  async create({
    createAssetDto,
    userId,
  }: {
    createAssetDto: CreateAssetDto[];
    userId: string;
  }): Promise<IAssetBE[]> {
    const savedAssets = createAssetDto.map((asset) => {
      const create = this.assetService.create(asset);
      return this.assetService.save({ ...create, user: { id: userId } });
    });
    return await Promise.all(savedAssets);
  }

  findAll() {
    return `This action returns all assets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
