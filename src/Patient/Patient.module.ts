import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './PatientService.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [PatientService, PrismaService],
})
export class PatientModule {}