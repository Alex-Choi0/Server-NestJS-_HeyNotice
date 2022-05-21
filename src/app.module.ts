import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql', // 데이터베이스 타입
    host: process.env.DB_HOST, // 주소
    port: +process.env.DB_PORT, // 데이터베이스 포스트
    username: process.env.DB_USERNAME, // 데이터베이스 소유자 이름
    password: process.env.DB_PASSWORD, // 데이터베이스 비밀번호
    database: process.env.DB_DATABASE, // 데이터베이스 이름
    autoLoadEntities: true, // 자동으로 entities를 DB에 배포
    synchronize: true // 동기화
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
