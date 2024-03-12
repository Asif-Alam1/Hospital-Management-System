import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PatientService,Patient } from "./PatientService.service";


@Controller('Patient')
export class PatientController {
    constructor(private PatientService:PatientService) {}
    @Get()
    findAll(): Patient[] {
        return this.PatientService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id:string): Patient {
      return this.PatientService.findOne(id);
    }

    @Post()
    create(@Body() Patient: Patient): Patient{
        return this.PatientService.create(Patient);
    }

    @Delete(':id')
    deleteOne(@Param('id') id:string): void {
        this.PatientService.deleteOne(id);
    }


    @Put(':id')
    updateOne(@Param('id') id:string, @Body() Patient: Patient): Patient {
        return this.PatientService.updateOne(id, Patient);
    }

}