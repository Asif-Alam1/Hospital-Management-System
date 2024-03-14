// src/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'fsrEBGmlpuAJPwJ0gs5AUQ==', // Hashed Secret Key
      signOptions: { expiresIn: '2h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, AuthGuard ],
  exports: [AuthService],
})
export class AuthModule {}