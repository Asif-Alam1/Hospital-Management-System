import { Injectable } from "@nestjs/common";
import { Appointment,Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()

export class AppointmentService {

constructor(private prisma: PrismaService) {}

async create(data: Prisma.AppointmentCreateInput): Promise<Appointment> {
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


  async findAll(
    filter?: Prisma.AppointmentWhereInput,
    orderBy?: Prisma.AppointmentOrderByWithRelationInput,
   page:number=1,perPage:number=10
  ): Promise<Appointment[]> {
    const skip = (page - 1) * perPage;
    return this.prisma.appointment.findMany({ where: {status:filter as any}, orderBy, skip, take: perPage });
  }


  // async findAll(
  //   filter?: Prisma.AppointmentWhereInput,
  //   orderBy?: Prisma.AppointmentOrderByWithRelationInput,
  //   page: number = 1,
  //   perPage: number = 10,
  //   status?: string
  // ): Promise<Appointment[]> {
  //   const skip = (page - 1) * perPage; // Calculate skip offset for pagination

  //   const where: Prisma.AppointmentWhereInput = {
  //     ...filter,
  //     status: { equals: status as any },
  //   };

  //   return this.prisma.appointment.findMany({
  //     where,
  //     orderBy,
  //     skip,
  //     take: perPage,
  //   });
  // }


async findOne(id: string): Promise<Appointment | null> {
    return this.prisma.appointment.findUnique({ where: { id } });
}

async deleteOne(id: string): Promise<Appointment> {
    return this.prisma.appointment.delete({ where: { id } });
}

async updateOne(id: string, data: Prisma.AppointmentUpdateInput): Promise<Appointment> {
    return this.prisma.appointment.update({ where: { id }, data });
}

 async findByDoctorId(doctorId: string): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({ where: { doctorId } });
  }

  async findByPatientId(patientId: string): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({ where: { patientId } });
  }
    async findByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({
      where: { date: { gte: startDate, lte: endDate } },
    });
  }

  async findByStatus(status: Appointment["status"]): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({ where: { status } });
  }
}