import { Controller,Get,Put,Post,Delete,Param,Body,UseGuards } from "@nestjs/common";
import { AppointmentService } from "./AppointmentService.service";
import { Appointment,Prisma } from "@prisma/client";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";


@Controller("Appointment")

export class AppointmentController {
constructor(private AppointmentService:AppointmentService) {}
@Get()
@UseGuards(AuthGuard)
async findAll(): Promise<Appointment[]> {
    return this.AppointmentService.findAll();
}
@Get(':id')
@UseGuards(AuthGuard)
async findOne(@Param('id') id:string): Promise<Appointment | null>{
  return this.AppointmentService.findOne(id);
}

@Post()
@UseGuards(AdminGuard)
async create(@Body() data:Prisma.AppointmentCreateInput): Promise<Appointment>{
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


}