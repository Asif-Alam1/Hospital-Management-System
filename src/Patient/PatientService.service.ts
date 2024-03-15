import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import {Patient,Prisma} from '@prisma/client';

@Injectable()
export class PatientService {
 constructor(private prisma: PrismaService) {}
async create(data: Prisma.PatientCreateInput): Promise<Patient> {
    return this.prisma.patient.create({ data });
  }
async findAll(page: number = 1, perPage: number = 10): Promise<Patient[]> {
    const skip = (page - 1) * perPage; // Calculate skip offset for pagination
    return await this.prisma.patient.findMany({
      skip,
      take: perPage,
    });

  }
 async findOne(id: string): Promise<Patient | null> {
    return this.prisma.patient.findUnique({ where: { id } });
  }

 async deleteOne(id: string): Promise<Patient> {
    return this.prisma.patient.delete({ where: { id } });
  }

async updateOne(id: string, data: Prisma.PatientUpdateInput): Promise<Patient> {
    return this.prisma.patient.update({ where: { id }, data });
  }

  async getDoctor(id: string) {
    const doctorid = await this.prisma.patient.findUnique({
      where: { id },
      select: {
        doctorId: true,
      },
    });
    return this.prisma.doctor.findUnique({
      where: { id: doctorid.doctorId },
    });

  }
  async getAppointments(id: string) {
    return this.prisma.appointment.findMany({
      where: {
        patientId: id,
      },
    });
  }
  async cancelAppointment(appointmentId: string) {
    return this.prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: "cancelled",
      },
    });
  }
  async rescheduleAppointment(appointmentId: string, date: Date) {
    return this.prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        date: date,
      },
    });
  }

  async createAppointment(data: Prisma.AppointmentCreateInput) {
    return this.prisma.appointment.create({ data });
  }

  async finishAppointment(appointmentId: string) {
    return this.prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: "completed",
      },
    });
  }

async getAppointment(id: string) {
    return this.prisma.appointment.findUnique({
      where: { id },
    });
  }

}