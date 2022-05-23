import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateBoardDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        nullable : false,
        description : '게시판 제목을 작성합니다',
        example : '헬스러운 프로그래밍'
    })
    name : string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        nullable : false,
        description : '게시판의 내용을 작성합니다',
        example :  '프로그래밍은 매우 어렵고 항상 새로운것을 배워야 합니다.'
    })
    content : string;
} 
