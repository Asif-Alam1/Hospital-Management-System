import { Module } from '@nestjs/common';
import { DoctorController } from './Doctor.controller';
import { DoctorService } from './DoctorService.service';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DoctorGuard } from 'src/guards/doctor.guard';



@Module({
  imports: [
    JwtModule.register({
      secret: 'fsrEBGmlpuAJPwJ0gs5AUQ==', // Hashed Secret Key
      signOptions: { expiresIn: '2h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [DoctorController],
  providers: [DoctorService,PrismaService,AuthGuard,AdminGuard,DoctorGuard],
})
export class DoctorModule {}
