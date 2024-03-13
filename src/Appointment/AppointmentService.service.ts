import { Injectable } from "@nestjs/common";
import { Appointment,Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()

export class AppointmentService {

constructor(private prisma: PrismaService) {}

async create(data:Prisma.AppointmentCreateInput): Promise<Appointment> {
    return this.prisma.appointment.create({ data });
}

async findAll(): Promise<Appointment[]> {
    return this.prisma.appointment.findMany();
}

async findOne(id: string): Promise<Appointment | null> {
    return this.prisma.appointment.findUnique({ where: { id } });
}

async deleteOne(id: string): Promise<Appointment> {
    return this.prisma.appointment.delete({ where: { id } });
}

async updateOne(id: string, data: Prisma.AppointmentUpdateInput): Promise<Appointment> {
    return this.prisma.appointment.update({ where: { id }, data });
}


}