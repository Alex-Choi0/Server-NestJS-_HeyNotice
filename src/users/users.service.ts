import { Injectable } from '@nestjs/common';
import { createRefreshToken, createToken } from 'src/utils/tokenFun';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(dto: SignupUserDto) {
    return {
      message: 'This is signup',
      data: dto,
    };
  }

  signin(dto: SigninUserDto) {
    // 임시 리턴값. 이후 수정해야함
    return {
      message: 'This is signin',
      data: {
        token: createToken('12345'),
        refToken: createRefreshToken('12345'),
      },
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id, dto: UpdateUserDto) {
    return {
      message: 'This is user update',
      data: {
        id,
        update: dto,
      },
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
