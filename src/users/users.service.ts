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
        token: createToken(result.id),
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
      const db_user = await this.userRepository.findOne({where: {email}})
      console.log("search user result : ", db_user)
      if (!db_user || email != db_user.email) {
        throw new HttpException(
          '존재하지 않는 email입니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      if (!bcrypt.compareSync(password, db_user.password)){
        throw new HttpException(
          '비밀번호가 틀렸습니다.', HttpStatus.BAD_REQUEST
        )
      }

      db_user['reftoken'] = createRefreshToken(db_user.id); 
      await this.userRepository.save(db_user);

      console.log("로그인 완료");

      return{
        message : 'This is signin',
        data : {
          token : createToken(db_user.id),
          refToken : db_user.reftoken
        }
      } 
    } catch (err) {
      console.log('Error : ', err);
      throw new HttpException(
        err.response ? err.response : 'Error From UsersService -> signin',
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

  async update(id, dto: UpdateUserDto) {
    try {
      console.log("update id : ", id);
      const db_user = await this.userRepository.findOne(id);
      console.log("find user from db : ", db_user);

      if(!db_user){
        throw new HttpException("존재하지 않는 계정 입니다.", HttpStatus.NOT_FOUND);
      }

      if(dto.password && dto.password.length > 0){
        dto.password = bcrypt.hashSync(
          dto.password,
          await bcrypt.genSaltSync(+process.env.ROUND),
        ); 
      }

      const update_user = {
        ...db_user,
        ...dto
      }

      console.log("update user info :", update_user);

      await this.userRepository.save(update_user);
      
      if(dto.password) delete dto.password;

      return {
        message: 'This is user update',
        data: {
          id,
          update: dto,
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

  async remove(id: string) {
    console.log("delete id : ", id);
    const db_user = await this.userRepository.findOne(id);
    console.log("find user from db : ", db_user);

    if(!db_user){
      throw new HttpException("존재하지 않는 계정 입니다.", HttpStatus.NOT_FOUND);
    }

    return {
        message: 'This is user has been deleted',
        data: await this.userRepository.delete(id),
      };
    } catch (err) {
      console.log('Error : ', err);
      throw new HttpException(
        err.response ? err.response : 'Error From UsersService -> create',
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
}
