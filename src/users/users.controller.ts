import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetTokenUserId } from 'src/utils/decoraters/get-token.decorator';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('유저 API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ summary: '유저 가입' })
  async signup(@Body() dto: SignupUserDto) {
    return await this.usersService.create(dto);
  }

  @Post('signin')
  @ApiOperation({ summary: '유저 로그인' })
  signin(@Body() dto: SigninUserDto) {
    return this.usersService.signin(dto);
  }

  // @Get(':id')
  // @ApiOperation({ summary : 'id로 유저 조회'})
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'id로 유저 업데이트' })
  update(
    @Body() updateUserDto: UpdateUserDto,
    @GetTokenUserId('id') id: string,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'id로 유저 삭제' })
  remove(@GetTokenUserId('id') id: string) {
    return this.usersService.remove(+id);
  }
}
