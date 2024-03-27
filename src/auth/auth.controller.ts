import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import {User, Prisma} from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';


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
  async logout(@Request() req:any){
  const token = req.headers['authorization'].split(' ')[1];
    return this.authService.logout(token);
  }

  //this is how the protected route is created, however this will need client side logic to keep trakc of the jwt token issued by the server and send it with every request to the server
  @Get()
  @UseGuards(AuthGuard)
  protected(){
    return "You are authenticated"
  }

  @Get('admin')
  @UseGuards(AdminGuard)
  admin(){
    return "You are an admin"
  }

}
