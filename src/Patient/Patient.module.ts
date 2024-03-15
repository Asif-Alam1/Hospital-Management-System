import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './PatientService.service';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PatientGuard } from 'src/guards/patient.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'fsrEBGmlpuAJPwJ0gs5AUQ==', // Hashed Secret Key
      signOptions: { expiresIn: '2h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PatientController],
  providers: [PatientService, PrismaService, AuthGuard, AdminGuard,PatientGuard],
})
export class PatientModule {}