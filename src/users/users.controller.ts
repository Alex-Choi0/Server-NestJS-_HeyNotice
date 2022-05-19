import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';


@ApiTags("유저 API")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ summary : '유저 가입'})
  signup(@Body() dto: SignupUserDto ) {
    return this.usersService.create(dto);
  }

  @Post('signin')
  @ApiOperation({ summary : '유저 로그인'})
  signin(@Body() dto: SigninUserDto) {
    return this.usersService.signin(dto);
  }

  // @Get(':id')
  // @ApiOperation({ summary : 'id로 유저 조회'})
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Patch(':id')
  @ApiOperation({summary : 'id로 유저 업데이트'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({summary : 'id로 유저 삭제'})
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
