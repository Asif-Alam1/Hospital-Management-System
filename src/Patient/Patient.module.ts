import { Module } from '@nestjs/common';
import { PatientController } from './Patient.controller';
import { PatientService } from './PatientService.service';


@Module({
  imports: [],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
