import { Controller,Get,Post,Delete,Param,Body,Put } from "@nestjs/common";
import { DoctorService } from "./DoctorService.service";
import { Doctor,Prisma } from "@prisma/client";



@Controller('Doctor')
export class DoctorController {
    constructor(private DoctorService:DoctorService) {}
    @Get()
   async findAll(): Promise<Doctor[]> {
        return this.DoctorService.findAll();
    }
    @Get(':id')
   async findOne(@Param('id') id:string): Promise<Doctor | null>{
      return this.DoctorService.findOne(id);
    }

    @Post()
    async create(@Body() data: Prisma.DoctorCreateInput): Promise<Doctor>{
        return this.DoctorService.create(data);
    }

    @Delete(':id')
    async deleteOne(@Param('id') id:string): Promise<Doctor> {
        return this.DoctorService.deleteOne(id);
    }

    @Put(':id')
   async updateOne(@Param('id') id:string, @Body() data:Prisma.DoctorUpdateInput): Promise<Doctor> {
        return this.DoctorService.updateOne(id, data);
    }



}