import { Controller,Get,Put,Post,Delete,Param,Body,UseGuards,Query } from "@nestjs/common";
import { AppointmentService } from "./AppointmentService.service";
import { Appointment,Prisma } from "@prisma/client";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";


@Controller("Appointment")

export class AppointmentController {
constructor(private AppointmentService:AppointmentService) {}
@Get()
@UseGuards(AuthGuard)
async findAll(@Query('skip') skip?: number,
    @Query('take') take?: number,@Query('filter') filter?: Prisma.AppointmentWhereInput, @Query('orderBy') orderBy?:Prisma.AppointmentOrderByWithRelationInput): Promise<Appointment[]> {
    return this.AppointmentService.findAll(filter,orderBy,skip,take);
}
@Get(':id')
@UseGuards(AuthGuard)
async findOne(@Param('id') id:string): Promise<Appointment | null>{
  return this.AppointmentService.findOne(id);
}

@Post()
@UseGuards(AdminGuard)
async create(@Body() data:Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>{
    return this.AppointmentService.create(data);
}

@Delete(':id')
@UseGuards(AdminGuard)
async deleteOne(@Param('id') id:string): Promise<Appointment> {
    return this.AppointmentService.deleteOne(id);
}

@Put(':id')
@UseGuards(AdminGuard)
async updateOne(@Param('id') id:string, @Body() data: Prisma.AppointmentUpdateInput): Promise<Appointment> {
    return this.AppointmentService.updateOne(id, data);
}

@Get('/doctor/:doctorId')
@UseGuards(AuthGuard)
async findByDoctorId(@Param('doctorId') doctorId: string): Promise<Appointment[]> {
    return this.AppointmentService.findByDoctorId(doctorId);
}
@Get('/patient/:patientId')
@UseGuards(AuthGuard)
async findByPatientId(@Param('patientId') patientId: string): Promise<Appointment[]> {
    return this.AppointmentService.findByPatientId(patientId);
}
@Get('/status/:status')
@UseGuards(AuthGuard)
async findByStatus(@Param('status') status: Appointment['status']): Promise<Appointment[]> {
    return this.AppointmentService.findByStatus(status);
}

@Get('/date')
@UseGuards(AuthGuard)
async findByDate(@Query('startDate') startDate:Date,@Query('endDate') endDate:Date): Promise<Appointment[]> {
    return this.AppointmentService.findByDateRange(startDate,endDate);

}
}