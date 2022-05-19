import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignupUserDto {
    @IsString()
    @ApiProperty({
        required: true,
        description : "사용자 이메일",
        example : "alex@gmail.com"
    })
    email : string;


    @IsString()
    @ApiProperty({
        required: true,
        description : "사용자 비밀번호",
        example : "secure_password"
    })
    password : string;


    @IsString()
    @ApiProperty({
        required: true,
        description : "사용자 username",
        example : "alexBest"
    })
    username : string;

}
