import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { createRefreshToken, createToken } from 'src/utils/tokenFun';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(dto: SignupUserDto) {
    try {
      console.log('Starting UsersService create : ', dto);
      console.log(
        'duplicate email : ',
        await this.userRepository.findOne({ where: { email: dto.email } }),
      );
      // check duplicate email
      if (await this.userRepository.findOne({ where: { email: dto.email } })) {
        throw new HttpException(
          `중복된 이메일 : ${dto.email}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      dto.password = bcrypt.hashSync(
        dto.password,
        await bcrypt.genSaltSync(+process.env.ROUND),
      );

      dto['id'] = uuid();
      console.log('uuid generate : ', dto['id']);
      dto['reftoken'] = createRefreshToken(dto['id']);
      const result = await this.userRepository.save(
        this.userRepository.create(dto),
      );
      delete result.password;
      return {
        message: 'Sign Up finish',
        token: {
          toekn: createToken(result.id),
          reftoken: result.reftoken,
        },
        result,
      };
    } catch (err) {
      console.log('Error : ', err);
      throw new HttpException(
        err.response ? err.response : 'Error From UsersService -> create',
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signin(dto: SigninUserDto) {
    try {
      const { email, password } = dto;
      if (!(await this.userRepository.findOne({ where: { email } }))) {
        throw new HttpException(
          '존재하지 않는 email입니다.',
          HttpStatus.BAD_REQUEST,
        );
      }
      // 임시 리턴값. 이후 수정해야함
      return {
        message: 'This is signin',
        data: {
          token: createToken('12345'),
          refToken: createRefreshToken('12345'),
        },
      };
    } catch (err) {
      console.log('Error : ', err);
      throw new HttpException(
        err.response ? err.response : 'Error From UsersService -> create',
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id, dto: UpdateUserDto) {
    try {
      return {
        message: 'This is user update',
        data: {
          id,
          update: dto,
        },
      };
    } catch (err) {
      throw new HttpException(
        'Error From UsersService -> create',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
