import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './Patient/Patient.module';
import { DepartmentModule } from './Department/Deparment.module';
import { DoctorModule } from './Doctor/Doctor.module';
@Module({
  imports: [PatientModule, DepartmentModule,DoctorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
