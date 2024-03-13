import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Doctor,Prisma } from "@prisma/client";


@Injectable()
export class DoctorService {
    constructor(private prisma: PrismaService) {}
  async  create(data:Prisma.DoctorCreateInput): Promise<Doctor> {
        return this.prisma.doctor.create({ data });
    }

   async  findAll(): Promise<Doctor[]> {
        return this.prisma.doctor.findMany();
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
}