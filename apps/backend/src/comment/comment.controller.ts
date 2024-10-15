import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetUser } from 'src/auth/decorator/user';
import { IJwtPayload } from 'src/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FilterCommentDto } from './dto/filter-comment.dto';

@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: IJwtPayload,
  ) {
    return this.commentService.create({ createCommentDto, userId: user.id });
  }

  @Get()
  findAll(@Body() filterDto: FilterCommentDto, @GetUser() user: IJwtPayload) {
    return this.commentService.findAll({ userId: user.id, filterDto });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
