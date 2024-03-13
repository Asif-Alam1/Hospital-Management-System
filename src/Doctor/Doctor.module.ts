import { Module } from '@nestjs/common';
import { DoctorController } from './Doctor.controller';
import { DoctorService } from './DoctorService.service';
import { PrismaService } from 'src/prisma.service';


@Module({
  imports: [],
  controllers: [DoctorController],
  providers: [DoctorService,PrismaService],
})
export class DoctorModule {}
