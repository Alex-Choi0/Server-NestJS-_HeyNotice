import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetTokenUserId } from 'src/utils/decoraters/get-token.decorator';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags('게시판 API')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({summary : '게시판 작성', description : '토큰을 이용하여 게시판을 작성합니다.'})
  create(
    @Body() dto: CreateBoardDto,
    @GetTokenUserId('id') id : string
  ) {
    return this.boardsService.create(id, dto);
  }

  @Get()
  @ApiQuery({
    description : 'skip은 생략할 record를 설정한다',
    name: 'skip',
    example: 0,
    type : Number
  })
  @ApiQuery({
    description : 'take은 skip 이후에서 불러올 record 수를 설정한다',
    name: 'take',
    example: 0,
    type : Number
  })
  async findAll(
    @Query('skip') skip : number,
    @Query('take') take : number
  ) {
    return await this.boardsService.findAll(skip, take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }
}
