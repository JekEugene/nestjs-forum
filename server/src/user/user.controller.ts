import { Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userServise: UserService){}

  @Get(':id')
  @Roles('guest', 'user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  getUser(@Param('id') id:string) {
    return this.userServise.getUser(id)
  }

  @Get(':id/getPosts')
  @Roles('guest', 'user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  getUserPosts(@Param('id') id:string) {
    return this.userServise.getUserPosts(id)
  }
}
