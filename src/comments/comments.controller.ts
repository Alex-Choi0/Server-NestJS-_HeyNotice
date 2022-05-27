import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetTokenUserId } from 'src/utils/decoraters/get-token.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('댓글API')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary : '게시판 작성',
    description : '토큰을 이용하여 존재하고 있는 게시판에 댓글을 작성합니다'
  })
  create(@Body() dto: CreateCommentDto, @GetTokenUserId('id') id: string) {
    return this.commentsService.create(id, dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary : '해당 유저가 작성한 댓글을 skip, take으로 불러온다.',
    description : '해당 토큰을 가진 유저가 쓴 댓글을 조회 한다. 이때 skip와 take을 이용하여 일부 혹은 전체를 가져온다'
  })
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
  findAll(@Query('skip') skip: number, @Query('take') take: number, @GetTokenUserId('id') id : string) {
    return this.commentsService.findAll();
  }

  @Get(':commentId')
  @ApiOperation({
    summary : '댓글의 commentId를 이용하여 댓글 내용을 확인합니다.',
    description : '댓글의 commentId를 이용하여 어느 댓글이던지 확인할수 있습니다.'
  })
  @ApiParam({
    description: "댓글의 commentId를 검색합니다.",
    name : 'commentId',
    example : '9bff1e84-ab64-4fb3-a9b8-cf30c8885822',
    type : String
  })
  findOne(@Param('commentId') commentId: string) {
    return this.commentsService.findOne(commentId);
  }

  @Patch(':commentId')
  @ApiBearerAuth()
  @ApiOperation({
    summary : '해당 윶가 작성한 댓글을 수정한다',
    description : '해당 토큰을 가진 유저가 댓글 id를 이용하여 댓글을 수정합니다.'
  })
  update(@Param('commentId') commentId: string, @Body() dto: UpdateCommentDto, @GetTokenUserId('id') id : string) {
    return this.commentsService.update(commentId,id,dto);
  }

  @Delete(':commentId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '해당 댓글을 삭제한다',
    description : '토큰을 가진 유저가 자신이 작성한 댓글 하나를 삭제한다.'
  })
  @ApiParam({
    description : "댓글의 id를 입력합니다",
    name : 'commentId',
    example : 'baa2607d-c2d2-4ea4-be62-fbd45ec810e8',
    type :String
  })
  remove(@Param('commentId') commentId: string, @GetTokenUserId('id') id : string) {
    return this.commentsService.remove(commentId, id);
  }
}
