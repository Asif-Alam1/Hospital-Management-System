import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './Patient/Patient.module';
import { DepartmentModule } from './Department/Deparment.module';
import { DoctorModule } from './Doctor/Doctor.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppointmentModule } from './Appointment/Appointment.module';
@Module({
  imports: [PatientModule, DepartmentModule,DoctorModule,ConfigModule.forRoot(), AuthModule, UsersModule,AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
