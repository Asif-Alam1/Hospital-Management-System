import { Controller,Get,Put,Post,Delete,Param,Body } from "@nestjs/common";
import { AppointmentService } from "./AppointmentService.service";
import { Appointment,Prisma } from "@prisma/client";


@Controller("Appointment")

export class AppointmentController {
constructor(private AppointmentService:AppointmentService) {}
@Get()
async findAll(): Promise<Appointment[]> {
    return this.AppointmentService.findAll();
}
@Get(':id')
async findOne(@Param('id') id:string): Promise<Appointment | null>{
  return this.AppointmentService.findOne(id);
}

@Post()
async create(@Body() data:Prisma.AppointmentCreateInput): Promise<Appointment>{
    return this.AppointmentService.create(data);
}

@Delete(':id')
async deleteOne(@Param('id') id:string): Promise<Appointment> {
    return this.AppointmentService.deleteOne(id);
}

@Put(':id')
async updateOne(@Param('id') id:string, @Body() data: Prisma.AppointmentUpdateInput): Promise<Appointment> {
    return this.AppointmentService.updateOne(id, data);
}


}