import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(data: Prisma.UserCreateInput): Promise<any> {
    const { id, Password } = data;

    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id } });
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
    userId = await this.prisma.doctor.findUnique({ where: { userId: id } });
  }
  else if(user.role=='Patient')
  {
    userId = await this.prisma.patient.findUnique({ where: { userId: id } });
  }else{
    userId={id:null};
  }

      const payload = { id: user.id, role: user.role,userId:userId.id};
    return this.jwtService.sign(payload);
  }

  async register(data: Prisma.UserCreateInput): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.Password, saltOrRounds);
    data.Password = hash;

    return this.prisma.user.create({ data });

  }

  async logout() {
    return null;
  }
}