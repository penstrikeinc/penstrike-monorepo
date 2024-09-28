import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Repository } from 'typeorm';

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
  }): Promise<Asset[]> {
    const savedAssets = createAssetDto.map((asset) => {
      const payload = { ...asset, user: { id: userId } };
      const create = this.assetService.create(payload);
      return this.assetService.save(create);
    });
    return await Promise.all(savedAssets);
  }

  findAll() {
    return this.assetService.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    return await this.assetService.update(id, updateAssetDto);
  }

  async remove(id: string) {
    return await this.assetService.delete(id);
  }
}
