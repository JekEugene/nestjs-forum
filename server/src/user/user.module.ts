import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Post } from '../post/post.model';
import { User } from './user.model'
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([Post, User])
  ],
})
export class UserModule {}
