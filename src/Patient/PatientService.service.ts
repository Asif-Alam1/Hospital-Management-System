import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import {Appointment, Patient,Prisma} from '@prisma/client';

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
  async findByName(name: string): Promise<Patient[] | null> {
    return this.prisma.patient.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
     async findAppointmentByStatus(status: string,id:string): Promise<Appointment[]| null> {
        return this.prisma.appointment.findMany({
            where: {
              status:status as any,
            patientId:id
          }
        })
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
async rescheduleAppointment(appointmentId: string, date: Date): Promise<Appointment | null> {
  // Fetch existing appointment details (optional for validation)
  const existingAppointment = await this.prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!existingAppointment) {
    throw new Error('Appointment not found');
  }

  const buffer = 30 * 60 * 1000;
  const dateObj = new Date(date.getTime());

  const startDate = new Date(dateObj.getTime() - buffer);
  const endDate = new Date(dateObj.getTime() + buffer);


  const overlappingDoctorAppointments = await this.prisma.appointment.findMany({
    where: {
      doctorId: existingAppointment.doctorId,
      id: { not: existingAppointment.id }, // Exclude the existing appointment
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  if (overlappingDoctorAppointments.length > 0) {
    throw new Error('Doctor already has an appointment during this timeframe');
  }


  const overlappingPatientAppointments = await this.prisma.appointment.findMany({
    where: {
      patientId: existingAppointment.patientId,
      id: { not: existingAppointment.id }, // Exclude the existing appointment
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  if (overlappingPatientAppointments.length > 0) {
    throw new Error('Patient already has an appointment during this timeframe');
  }


  return this.prisma.appointment.update({
    where: { id: appointmentId },
    data: { date: date, status:"pending" },
  });
}


async createAppointment(data: Prisma.AppointmentCreateInput): Promise<Appointment> {
  const {  date } = data;
  const doctorId = data.doctor.connect.id;
  const patientId = data.patient.connect.id;


  const buffer = 30 * 60 * 1000;
  const dateObj = typeof date === 'string' ? new Date(date) : date;


  const startDate = new Date(dateObj.getTime() - buffer);
  const endDate = new Date(dateObj.getTime() + buffer);


  const existingDoctorAppointments = await this.prisma.appointment.findMany({
    where: {
      doctorId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  if (existingDoctorAppointments.length > 0) {
    throw new Error('Doctor already has an appointment during this timeframe');
  }


  const existingPatientAppointments = await this.prisma.appointment.findMany({
    where: {
      patientId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  if (existingPatientAppointments.length > 0) {
    throw new Error('Patient already has an appointment during this timeframe');
  }


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