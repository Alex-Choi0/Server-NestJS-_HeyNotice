import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBoardDto {
    @IsString()
    @ApiProperty({
        nullable : false
    })
    name : string;

    @IsString()
    @ApiProperty({
        nullable : true
    })
    content : string;
}
