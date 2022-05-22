import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { checkToken } from '../tokenFun';
export const GetTokenUserId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    try {
      const request = ctx.switchToHttp().getRequest();
      const token = await checkToken(request.headers);
      console.log('request Headers : ', request.headers);
      if (!request.headers['authorization']) {
        throw new HttpException('토큰이 없습니다.', HttpStatus.NOT_ACCEPTABLE);
      } else if (token['error']) {
        throw new HttpException(token['message'], token['error']);
      }
      console.log('token : ', token);

      return token['id'];
    } catch (err) {
      console.log(err);
      throw new HttpException(
        err['message'],
        err['status'] ? err['status'] : 500,
      );
    }
  },
);
