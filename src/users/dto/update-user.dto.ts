import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: '사용자 이메일',
    example: 'alex@gmail.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: '사용자 비밀번호',
    example: 'secure_password',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: '사용자 username',
    example: 'alexBest',
  })
  username: string;
}

// export class UpdateUserDto extends PartialType (
//     OmitType(SignupUserDto, ['email'] as const)
// ){}
