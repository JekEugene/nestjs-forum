import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../post/post.model';
import { User } from '../user/user.model';
import { Comment } from '../post/comment.model';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [
    SequelizeModule.forFeature([User, Post, Comment]),
  ]
})
export class HomeModule {}
