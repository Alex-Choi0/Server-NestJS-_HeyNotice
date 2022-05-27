import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  create(dto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(commentId: string) {
    return `This action returns a #${commentId} comment`;
  }

  update(commentId: string,id: string, dto: UpdateCommentDto) {
    return `This action updates a #${commentId} comment`;
  }

  remove(commentId : string, id: string) {
    return `This action removes a #${id} comment`;
  }
}
