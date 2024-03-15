import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards,Query } from "@nestjs/common";
import { PatientService } from "./PatientService.service";
import { Patient, Prisma } from "@prisma/client";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";
import { PatientGuard } from "src/guards/patient.guard";

@Controller('patient')
export class PatientController {
    constructor(private patientService: PatientService) {}

    @Get()
    @UseGuards(AdminGuard)
    async findAll( @Query('skip') skip?: number,
    @Query('take') take?: number,): Promise<Patient[]> {
        return this.patientService.findAll(skip,take);
    }

    @Get(':id')
    @UseGuards(AdminGuard)
    async findOne(@Param('id') id: string): Promise<Patient | null> {
        return this.patientService.findOne(id);
    }

    @Post()
    @UseGuards(AdminGuard)
    async create(@Body() data: Prisma.PatientCreateInput): Promise<Patient> {
        return this.patientService.create(data);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    async deleteOne(@Param('id') id: string): Promise<Patient> {
        return this.patientService.deleteOne(id);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    async updateOne(@Param('id') id: string, @Body() data: Prisma.PatientUpdateInput): Promise<Patient> {
        return this.patientService.updateOne(id, data);
    }

    @Get(':id/doctor')
    @UseGuards(PatientGuard)
    async getDoctor(@Param('id') id: string) {
        return this.patientService.getDoctor(id);
    }
    @Get(':id/appointments')
    @UseGuards(PatientGuard)
    async getAppointments(@Param('id') id: string) {
        return this.patientService.getAppointments(id);
    }
    @Put(':id/appointments/:appointmentId/cancel')
    @UseGuards(PatientGuard)
    async cancelAppointment(@Param('id') id: string, @Param('appointmentId') appointmentId: string) {
        const appointment = await this.patientService.getAppointment(appointmentId);
      if(appointment.patientId !== id) {
        throw new Error('Appointment does not belong to patient');
      }
      if(appointment.status === 'completed') {
        throw new Error('Cannot cancel completed appointment');
      }
        return this.patientService.cancelAppointment(appointmentId);
    }
    @Put(':id/appointments/:appointmentId/reschedule')
    @UseGuards(PatientGuard)
    async rescheduleAppointment(@Param('id') id: string, @Param('appointmentId') appointmentId: string, @Body() date: Date) {
        const appointment = await this.patientService.getAppointment(appointmentId);
      if(appointment.patientId !== id) {
        throw new Error('Appointment does not belong to patient');
      }
      if(appointment.status === 'completed'|| appointment.status === 'cancelled') {
        throw new Error('Cannot reschedule completed or cancelled appointment');
      }
        return this.patientService.rescheduleAppointment(appointmentId, date);
    }

    @Post(':appointments')
    @UseGuards(PatientGuard)
    async createAppointment( @Body() data: Prisma.AppointmentCreateInput) {
        return this.patientService.createAppointment(data);
    }
    @Put(':id/appointments/:appointmentId')
    @UseGuards(PatientGuard)
    async completeAppointment(@Param('id') id: string, @Param('appointmentId') appointmentId: string) {
      const appointment = await this.patientService.getAppointment(appointmentId);
      if(appointment.patientId !== id) {
        throw new Error('Appointment does not belong to patient');
      }
      if(appointment.status === 'cancelled') {
        throw new Error('Cannot complete cancelled appointment');
      }
        return this.patientService.finishAppointment(appointmentId);
    }

}