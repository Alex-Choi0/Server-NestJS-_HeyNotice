import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsService } from 'src/boards/boards.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    private readonly boardService: BoardsService,
  ) {}
  async create(id: string, dto: CreateCommentDto) {
    try {
      const findBoard = await this.boardService.findOne(dto.boardId);
      if (!findBoard)
        throw new HttpException(
          '존재하지 않는 게시판 글 입니다.',
          HttpStatus.NOT_FOUND,
        );

      const comment = this.commentRepository.create({
        usersId: id,
        boardsId: dto.boardId,
        content: dto.comment,
      });

      return {
        message: 'comment this post',
        data: await this.commentRepository.save(comment),
      };
    } catch (err) {
      console.log('Error : ', err);
      throw new HttpException(
        err.response ? err.response : 'Error From CommentsService -> create',
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(commentId: string) {
    return `This action returns a #${commentId} comment`;
  }

  update(commentId : string, id: string, dto : UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(commentId: string, id: string) {
    try {
      const comment = await this.commentRepository.findOne({ id: commentId });
      if (!comment)
        throw new HttpException(
          '댓글이 존재하지 않습니다.',
          HttpStatus.NOT_FOUND,
        );
      else if (id != comment.usersId)
        throw new HttpException(
          '댓글 작성자와 삭제자가 같지 않습니다.',
          HttpStatus.BAD_REQUEST,
        );

      return {
        message: '댓글 삭제 완료',
        data: await this.commentRepository.remove(comment),
      };
    } catch (err) {
      console.log('Error : ', err);
      throw new HttpException(
        err.response ? err.response : 'Error From CommentsService -> create',
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
