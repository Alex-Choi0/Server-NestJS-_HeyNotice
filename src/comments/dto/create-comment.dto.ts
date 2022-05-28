import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @ApiProperty({
    nullable: false,
    description: '해당 게시판에 댓글을 작성할 boardId 입력',
    example: 'd850f53e-f3a9-4719-a638-1643500f8ce3',
  })
  boardId: string;

  @IsString()
  @ApiProperty({
    nullable: false,
    description: '게시판에 작성할 댓글',
    example: '프로그래밍은 300km정도 자전거를 15시간정도 타는것과 비슷하다',
  })
  comment: string;
}
