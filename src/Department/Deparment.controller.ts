import { Controller,Get,Post,Delete,Param,Body,Put } from "@nestjs/common";
import{ DepartmentService,Department } from "./DepartmentService.service";


@Controller('Department')
export class DepartmentController {
    constructor(private DepartmentService:DepartmentService) {}
    @Get()
    findAll(): Department[] {
        return this.DepartmentService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id:string): Department {
      return this.DepartmentService.findOne(id);
    }

    @Post()
    create(@Body() Department: Department): Department{
        return this.DepartmentService.create(Department);
    }

    @Delete(':id')
    deleteOne(@Param('id') id:string): void {
        this.DepartmentService.deleteOne(id);
    }

    @Put(':id')
    updateOne(@Param('id') id:string, @Body() Department: Department): Department {
        return this.DepartmentService.updateOne(id, Department);
    }

}