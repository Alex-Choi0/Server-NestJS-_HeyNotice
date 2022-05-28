import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(id: string, dto: CreateBoardDto) {
    try {
      const data = this.boardRepository.create({
        usersId: id,
        ...dto,
      });

      await this.boardRepository.save(data);

      return {
        message: 'upload your post',
        data,
      };
    } catch (err) {
      console.log('Error : ', err);
      throw new HttpException(
        err.response ? err.response : 'Error From BoardsService -> create',
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(skip: number, take: number) {
    console.log('findAll skip : ', skip, ' take : ', take);
    const data = await this.boardRepository.find({
      skip,
      take,
      order: {
        created_at: 'DESC',
      },
    });
    return {
      message: 'DB에 등록된 게시글 출력 완료',
      data,
    };
  }

  async findOne(id: string) {
    try {
      console.log('Start findOne');
      const data = await this.boardRepository.findOne(id);

      if (!data)
        throw new HttpException(
          '존재하지 않는 글입니다.',
          HttpStatus.NOT_FOUND,
        );

      const comment = await getManager().query(`
      SELECT id, usersId, comment, created_at FROM comments WHERE boardsId='${id}' ORDER BY created_at DESC
      `);
      return {
        message: 'find board result',
        data: {
          post: data,
          comment,
        },
      };
    } catch (err) {
      console.log('Error : ', err);
      throw new HttpException(
        err.response ? err.response : 'Error From BoardsService -> create',
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, boardId: string, dto: UpdateBoardDto) {
    try {
      const findBoard = await this.boardRepository.findOne(boardId);
      if (!findBoard) {
        throw new HttpException(
          '존재하지 않는 게시판 글입니다.',
          HttpStatus.NOT_FOUND,
        );
      } else if (findBoard.usersId != id) {
        throw new HttpException(
          '해당 작성자와 수정하는 분이 일치 하지 않습니다',
          HttpStatus.CONFLICT,
        );
      }

      const updateBoard = this.boardRepository.create({
        ...findBoard,
        ...dto,
      });

      return {
        message: '게시판 삭제 완료',
        data: await this.boardRepository.save(updateBoard),
      };
    } catch (err) {
      console.log('Error : ', err);
      throw new HttpException(
        err.response ? err.response : 'Error From BoardsService -> create',
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string, boardId: string) {
    console.log('boards.service remove id :', id);
    try {
      const deleteBoard = await this.boardRepository.findOne(boardId);
      if (!deleteBoard) {
        throw new HttpException(
          '존재하지 않는 게시판 글입니다.',
          HttpStatus.NOT_FOUND,
        );
      } else if (deleteBoard.usersId != id) {
        throw new HttpException(
          '해당 작성자와 삭제하는 분이 일치 하지 않습니다',
          HttpStatus.CONFLICT,
        );
      }

      return {
        message: '게시판 삭제 완료',
        data: await this.boardRepository.remove(deleteBoard),
      };
    } catch (err) {
      console.log('Error : ', err);
      throw new HttpException(
        err.response ? err.response : 'Error From BoardsService -> create',
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
