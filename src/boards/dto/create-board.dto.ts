import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBoardDto {
    @IsString()
    @ApiProperty({
        nullable : false,
        description : '게시판 제목을 작성합니다',
        example : '즐거운 프로그래밍'
    })
    name : string;

    @IsString()
    @ApiProperty({
        nullable : true,
        description : '게시판의 내용을 작성합니다',
        example :  '프로그래밍은 두뇌의 활용이 큰 작업중에 하나입니다. 그렇기 때문에 어느 직종보다 신체와 정신 건강에 최우선을 두어야 합니다.'
    })
    content : string;
}
