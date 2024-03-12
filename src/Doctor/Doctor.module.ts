import { Module } from '@nestjs/common';
import { DoctorController } from './Doctor.controller';
import { DoctorService } from './DoctorService.service';


@Module({
  imports: [],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
