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
    const payload = {
      massage: createCommentDto.massage,
      finding: { id: createCommentDto.findingId },
      user: { id: userId },
      parentId: createCommentDto.parentId ?? null,
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

  async findOne(id: string) {
    return await this.commentRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOne(id);

    if (!comment) {
      throw new BadRequestException(
        `Comment not found with this comment Id: ${id}`,
      );
    }

    return await this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: string) {
    const comment = await this.findOne(id);

    if (!comment) {
      throw new BadRequestException(
        `Comment not found with this comment Id: ${id}`,
      );
    }

    return await this.commentRepository.delete(id);
  }
}
