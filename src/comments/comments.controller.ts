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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('댓글 API')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '댓글 작성',
    description: '해당 게시판에 대한 댓글을 작성합니다.',
  })
  create(
    @GetTokenUserId('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(id, createCommentDto);
  }

  @Get()
  @ApiQuery({
    description: '조회할 게시판 id(boardId)를 입력합니다.',
    name: 'boardId',
    example: '7e30e348-9486-478b-8795-713a5638287b',
    type: String,
  })
  @ApiQuery({
    description: '조회시 skip할 갯수를 입력합니다.',
    name: 'skip',
    example: 0,
    type: Number,
  })
  @ApiQuery({
    description: '조회시 take할 갯수를 입력합니다.',
    name: 'take',
    example: 5,
    type: Number,
  })
  findAll(
    @Query('boardId') boardId: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.commentsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentsService.findOne(+id);
  // }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '댓글을 수정합니다',
    description: '토큰을 이용하여 확인후 기존의 댓글을 수정합니다',
  })
  update(
    @GetTokenUserId('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':commentId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '댓글을 삭제합니다.',
    description: '토큰을 이용하여 확인후 댓글을 삭제합니다.',
  })
  remove(
    @GetTokenUserId('id') id: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentsService.remove(id, commentId);
  }
}
