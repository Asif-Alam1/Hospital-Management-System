import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Doctor,Prisma,Appointment } from "@prisma/client";


@Injectable()
export class DoctorService {
    constructor(private prisma: PrismaService) {}
  async  create(data:Prisma.DoctorCreateInput): Promise<Doctor> {
        return this.prisma.doctor.create({ data });
    }

  async findAll(page: number = 1, perPage: number = 10): Promise<Doctor[]> {
    const skip = (page - 1) * perPage; // Calculate skip offset for pagination
    return await this.prisma.doctor.findMany({
      skip,
      take: perPage,
    });

  }

  async  findOne(id: string): Promise<Doctor | null> {
     return this.prisma.doctor.findUnique({ where: { id } });
    }

    async deleteOne(id: string): Promise<Doctor> {
        return this.prisma.doctor.delete({ where: { id } });
    }

 async   updateOne(id: string, data: Prisma.DoctorUpdateInput): Promise<Doctor> {
        return this.prisma.doctor.update({ where: { id }, data });
    }

    async getAppointments(id: string) {
        return this.prisma.appointment.findMany({
            where: {
                doctorId: id
            }
        })
}
async getAppointment(appointmentId: string) {
    return this.prisma.appointment.findUnique({
        where: {
            id: appointmentId
        }
    })
}

async approveAppointment(appointmentId: string) {
    return this.prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status: 'approved'
        }
    })
}

async rejectAppointment(appointmentId: string) {
    return this.prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status: 'cancelled'
        }
    })
}
}