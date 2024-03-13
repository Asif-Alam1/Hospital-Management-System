import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import {Patient,Prisma} from '@prisma/client';

@Injectable()
export class PatientService {
 constructor(private prisma: PrismaService) {}
async create(data: Prisma.PatientCreateInput): Promise<Patient> {
    return this.prisma.patient.create({ data });
  }
  async findAll(): Promise<Patient[]> {
    return this.prisma.patient.findMany();
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
}