import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PatientService } from "./PatientService.service";
import { Patient, Prisma } from "@prisma/client";

@Controller('patient')
export class PatientController {
    constructor(private patientService: PatientService) {}

    @Get()
    async findAll(): Promise<Patient[]> {
        return this.patientService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Patient | null> {
        return this.patientService.findOne(id);
    }

    @Post()
    async create(@Body() data: Prisma.PatientCreateInput): Promise<Patient> {
        return this.patientService.create(data);
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: string): Promise<Patient> {
        return this.patientService.deleteOne(id);
    }

    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() data: Prisma.PatientUpdateInput): Promise<Patient> {
        return this.patientService.updateOne(id, data);
    }
}