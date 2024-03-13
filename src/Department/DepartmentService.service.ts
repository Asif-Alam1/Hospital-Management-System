import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import {Department,Prisma} from '@prisma/client';
@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

async create(data:Prisma.DepartmentCreateInput): Promise<Department> {
 return this.prisma.department.create({ data });
}

async findAll(): Promise<Department[]>  {
    return this.prisma.department.findMany();
}


async findOne(id: string): Promise<Department | null> {
 return this.prisma.department.findUnique({ where: { id } });
}


async deleteOne(id: string): Promise<Department| null> {
 return this.prisma.department.delete({ where: { id } });

}

async updateOne(id: string, data: Prisma.DepartmentUpdateInput): Promise<Department> {
 return this.prisma.department.update({ where: { id }, data });
}

}