import { Module } from '@nestjs/common';
import { DepartmentController } from './Deparment.controller';
import { DepartmentService } from './DepartmentService.service';
import { PrismaService } from 'src/prisma.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({
      secret: 'fsrEBGmlpuAJPwJ0gs5AUQ==', // Hashed Secret Key
      signOptions: { expiresIn: '2h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService,PrismaService,AdminGuard],
})
export class DepartmentModule {}
