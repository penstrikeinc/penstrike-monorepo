import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { FilterCommentDto } from './dto/filter-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  create({
    createCommentDto,
    userId,
  }: {
    createCommentDto: CreateCommentDto;
    userId: string;
  }) {
    if (createCommentDto.parentId) {
      return 'This action adds a new comment with parent';
    }

    const payload = {
      massage: createCommentDto.massage,
      finding: { id: createCommentDto.findingId },
      user: { id: userId },
    };

    const newComment = this.commentRepository.create(payload);

    return this.commentRepository.save(newComment);
  }

  async findAll({
    userId,
    filterDto,
  }: {
    userId: string;
    filterDto: FilterCommentDto;
  }) {
    const { findingId } = filterDto;

    const comments = await this.commentRepository.find({
      where: { user: { id: userId }, finding: { id: findingId } },
      relations: { user: true, finding: true },
    });

    if (!comments) {
      throw new BadRequestException('Comments not found');
    }
    return {
      items: comments,
      meta: {
        count: comments.length,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
