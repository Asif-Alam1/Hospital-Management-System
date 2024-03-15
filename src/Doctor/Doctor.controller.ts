import { Controller,Get,Post,Delete,Param,Body,Put,UseGuards,Query } from "@nestjs/common";
import { DoctorService } from "./DoctorService.service";
import { Doctor,Prisma } from "@prisma/client";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";
import { DoctorGuard } from "src/guards/doctor.guard";

@Controller('Doctor')
export class DoctorController {
    constructor(private DoctorService:DoctorService) {}
    @Get()
    @UseGuards(AdminGuard)
   async findAll(@Query('skip') skip?: number,
    @Query('take') take?: number,): Promise<Doctor[]> {
        return this.DoctorService.findAll(skip,take);
    }
    @Get(':id')
    @UseGuards(AdminGuard)
   async findOne(@Param('id') id:string): Promise<Doctor | null>{
      return this.DoctorService.findOne(id);
    }

    @Post()
    @UseGuards(AdminGuard)
    async create(@Body() data: Prisma.DoctorCreateInput): Promise<Doctor>{
        return this.DoctorService.create(data);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    async deleteOne(@Param('id') id:string): Promise<Doctor> {
        return this.DoctorService.deleteOne(id);
    }
    @Put(':id')
    @UseGuards(AdminGuard)
   async updateOne(@Param('id') id:string, @Body() data:Prisma.DoctorUpdateInput): Promise<Doctor> {
        return this.DoctorService.updateOne(id, data);
    }

    @Get(':id/appointments')
    @UseGuards(DoctorGuard)
    async getAppointments(@Param('id') id: string) {
        return this.DoctorService.getAppointments(id);
    }

    @Put(':id/appointments/:appointmentId/approve')
    @UseGuards(DoctorGuard)
    async approveAppointment(@Param('id') id:string, @Param('appointmentId') appointmentId: string) {
      const appointment = await this.DoctorService.getAppointment(appointmentId);
      if(appointment.doctorId !== id) {
        throw new Error('Appointment does not belong to doctor');
      }
      if(appointment.status !== 'pending') {
        throw new Error('Cannot approve/reject completed appointment');
      }

        return this.DoctorService.approveAppointment(appointmentId);
    }

    @Put(':id/appointments/:appointmentId/reject')
    @UseGuards(DoctorGuard)
    async rejectAppointment(@Param('id') id:string, @Param('appointmentId') appointmentId: string) {
        const appointment = await this.DoctorService.getAppointment(appointmentId);
      if(appointment.doctorId !== id) {
        throw new Error('Appointment does not belong to doctor');
      }
      if(appointment.status !== 'pending') {
        throw new Error('Cannot approve/reject completed appointment');
      }
        return this.DoctorService.rejectAppointment(appointmentId);
    }
}