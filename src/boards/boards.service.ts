import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository : Repository<Board>
  ){}

  async create(id : string, dto: CreateBoardDto) {
    try{
      const data = this.boardRepository.create({
        usersId : id,
        ...dto
      })

      await this.boardRepository.save(data);

      return {
       message : 'upload your post',
       data 
      }
    } catch (err){
      console.log('Error : ', err);
      throw new HttpException(
        err.response ? err.response : 'Error From BoardsService -> create',
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

  }

  async findAll(skip: number, take : number) {
    console.log("findAll skip : ", skip, " take : ", take);
    const data = await this.boardRepository.find({
      skip,
      take,
      order : {
        created_at : 'DESC'
      }
    })
    return {
      message : 'DB에 등록된 게시글 출력 완료',
      data
    } 
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
