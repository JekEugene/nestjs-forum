import { Controller, Get, Post, Res, UseGuards, Response, Req, Request } from '@nestjs/common';
import { HomeService } from './home.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserAuth } from 'src/decorators/user.decorator';
import { authUser } from 'src/auth/authUser.model';
import { Body } from '@nestjs/common';

@Controller()
export class HomeController {
  constructor(private readonly homeService:HomeService) {}
  @Get()
  @Roles('guest', 'user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  homePage(@UserAuth() UserAuth: authUser) {
    return this.homeService.homePage(UserAuth)
  }
  @Post('login')
  @Roles('guest', 'user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  login(@UserAuth() UserAuth: authUser, @Body() body: Body, @Res({ passthrough: true }) res: Response) {
    return this.homeService.login(UserAuth, body, res)
  }
  @Post('register')
  @Roles('guest')
  @UseGuards(AuthGuard)
  register(@Body() body: Body) {
    return this.homeService.register(body)
  }
  @Post('logout')
  @Roles('user', 'moder', 'admin')
  @UseGuards(AuthGuard)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.homeService.logout(req, res)
  }
}