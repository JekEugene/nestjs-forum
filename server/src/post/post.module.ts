import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.model'
import { Comment } from './comment.model'
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.model';


@Module({
  controllers: [PostController],
  providers: [PostService, PostController],
  imports: [
    SequelizeModule.forFeature([User, Post, Comment])
  ]
  
})
export class PostModule {}
