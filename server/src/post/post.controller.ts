import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { authUser } from 'src/auth/authUser.model';
import { Roles } from 'src/auth/roles.decorator';
import { UserAuth } from 'src/decorators/user.decorator';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

  constructor(private readonly postService: PostService) { }

  @Get('get')
  @Roles('guest', 'user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  getAllPosts() {
    return this.postService.getAllPosts()
  }

  @Get(':id')
  @Roles('guest', 'user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  getPost(@Param('id') id:string) {
    return this.postService.getPost(id)
  }

  @Get(':id/getComments')
  @Roles('guest', 'user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  getComments(@Param('id') id:string) {
    return this.postService.getComments(id)
  }

  @Post('add')
  @Roles('user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  addPost(@UserAuth() UserAuth: authUser, @Body() body: Body) {
    return this.postService.addPost(UserAuth, body)
  }

  @Post('deletePost')
  @Roles('user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  deletePost(@UserAuth() UserAuth: authUser, @Body() body: Body) {
    return this.postService.deletePost(UserAuth, body)
  }

  @Post('addComment')
  @Roles('user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  addComment(@UserAuth() UserAuth: authUser, @Body() body: Body) {
    return this.postService.addComment(UserAuth, body)
  }

  @Post('deleteComment')
  @Roles('user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  deleteComment(@UserAuth() UserAuth: authUser, @Body() body: Body) {
    return this.postService.deleteComment(UserAuth, body)
  }
}
