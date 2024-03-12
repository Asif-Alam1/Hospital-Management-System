import { Controller,Get,Post,Delete,Param,Body,Put } from "@nestjs/common";
import { Doctor, DoctorService } from "./DoctorService.service";



@Controller('Doctor')
export class DoctorController {
    constructor(private DoctorService:DoctorService) {}
    @Get()
    findAll(): Doctor[] {
        return this.DoctorService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id:string): Doctor {
      return this.DoctorService.findOne(id);
    }

    @Post()
    create(@Body() Doctor: Doctor): Doctor{
        return this.DoctorService.create(Doctor);
    }

    @Delete(':id')
    deleteOne(@Param('id') id:string): void {
        this.DoctorService.deleteOne(id);
    }

    @Put(':id')
    updateOne(@Param('id') id:string, @Body() Doctor: Doctor): Doctor {
        return this.DoctorService.updateOne(id, Doctor);
    }



}