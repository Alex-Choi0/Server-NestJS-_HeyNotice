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
  @ApiOperation({ summary: '유저 가입', description: '회원 가입을 진행합니다.' })
  async signup(@Body() dto: SignupUserDto) {
    return await this.usersService.create(dto);
  }

  @Post('signin')
  @ApiOperation({ summary: '유저 로그인', description: '로그인을 진행합니다. 로그인이 완료되면 access, refrash토큰이 주어집니다.' })
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
  @ApiOperation({ summary: 'id로 유저 업데이트', description: '유저 정보를 업데이트 합니다.' })
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
    return this.usersService.remove(id);
  }
}
