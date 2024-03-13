import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {User, Prisma} from '@prisma/client';

import { AuthService } from './auth.service';

import { AuthGuard } from 'src/guards/auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService : AuthService) {}

  @Post('login')
 async login(@Body() data:Prisma.UserCreateInput): Promise<any> {
    return this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data:Prisma.UserCreateInput): Promise<User> {
    return this.authService.register(data);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

  @Get()
  @UseGuards(AuthGuard)
  protected(){
    return "You are authenticated"
  }


}
