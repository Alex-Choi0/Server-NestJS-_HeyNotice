import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly userService: UsersService,
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

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  async remove(id: string) {
    console.log('boards.service remove id :', id);
    try {
      const deleteBoard = await this.boardRepository.findOne(id);
      if (!deleteBoard)
        throw new HttpException(
          '존재하지 않는 게시판 글입니다.',
          HttpStatus.NOT_FOUND,
        );

      return {
        message: '게시판 삭제 완료',
        data: await this.boardRepository.delete(deleteBoard),
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
