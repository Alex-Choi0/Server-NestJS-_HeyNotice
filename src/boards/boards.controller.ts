import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({
    summary: '게시판 작성',
    description: '토큰을 이용하여 게시판을 작성합니다.',
  })
  create(@Body() dto: CreateBoardDto, @GetTokenUserId('id') id: string) {
    return this.boardsService.create(id, dto);
  }

  @Get()
  @ApiQuery({
    description: 'skip은 생략할 record를 설정한다',
    name: 'skip',
    example: 0,
    type: Number,
  })
  @ApiQuery({
    description: 'take은 skip 이후에서 불러올 record 수를 설정한다',
    name: 'take',
    example: 5,
    type: Number,
  })
  async findAll(@Query('skip') skip: number, @Query('take') take: number) {
    return await this.boardsService.findAll(skip, take);
  }

  @Get('user/posts')
  @ApiOperation({summary : '유저가 작성한 글을 출력한다', description : '토큰을 이용하여 해당 유저의 글을 skip와 take로 갖고온다'}) 
  @ApiBearerAuth()
  @ApiQuery({
    description: 'skip은 생략할 record를 설정한다',
    name: 'skip',
    example: 0,
    type: Number,
  })
  @ApiQuery({
    description: 'take은 skip 이후에서 불러올 record 수를 설정한다',
    name: 'take',
    example: 5,
    type: Number,
  })
  findUserPosts(@GetTokenUserId('id') id : string, @Query('skip') skip : number, @Query('take') take : number){
    return this.boardsService.findUserPosts(id, skip, take);
  }

  @Get(':boardId')
  findOne(@Param('boardId') boardId: string) {
    return this.boardsService.findOne(boardId);
  }

  @Patch(':boardId')
  @ApiBearerAuth()
  update(
    @GetTokenUserId('id') id : string,
    @Param('boardId') boardId: string, 
    @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(id, boardId, updateBoardDto);
  }

  @Delete(':boardId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '게시판 삭제',
    description:
      '토큰을 이용하여 게시판을 삭제 합니다. (해당 유저의 토큰을 확인해서 삭제를 진행함)',
  })
  remove(@GetTokenUserId('id') id: string, @Param('boardId') boardId : string) {
    return this.boardsService.remove(id, boardId);
  }
}
