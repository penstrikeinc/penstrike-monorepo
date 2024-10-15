import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

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
      // parentId: { id: createCommentDto.parentId ?? undefined },
    };

    const newComment = this.commentRepository.create(payload);

    return this.commentRepository.save(newComment);
  }

  findAll() {
    return `This action returns all comment`;
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
