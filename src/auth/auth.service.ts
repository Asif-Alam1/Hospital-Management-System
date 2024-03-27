import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) {}

  async login(data: Prisma.UserCreateInput): Promise<any> {
    const { Email, Password } = data;

    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { Email } });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Generate and return JWT token
    let userId
  if(user.role=='Doctor')
  {
    userId = await this.prisma.doctor.findUnique({ where: { userId: user.id } });
  }
  else if(user.role=='Patient')
  {
    userId = await this.prisma.patient.findUnique({ where: { userId: user.id } });
  }else{
    userId={id:null};
  }

      const payload = { id: user.id, role: user.role,userId:userId.id};
    return this.jwtService.sign(payload);
  }

  async register(data: Prisma.UserCreateInput): Promise<User> {
    const user= await this.prisma.user.findUnique({ where: { Email: data.Email } });
    if(user)
    {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.Password, saltOrRounds);
    data.Password = hash;

    return this.prisma.user.create({ data });

  }

async logout(token:string) {
  await this.jwtService.verify(token);
  await this.prisma.blacklist.create({data:{token}});
}
}