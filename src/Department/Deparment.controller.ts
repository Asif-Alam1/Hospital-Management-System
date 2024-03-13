import { Controller,Get,Post,Delete,Param,Body,Put } from "@nestjs/common";
import{ DepartmentService } from "./DepartmentService.service";
import { Department,Prisma } from "@prisma/client";


@Controller('Department')
export class DepartmentController {
    constructor(private DepartmentService:DepartmentService) {}
    @Get()
  async  findAll(): Promise<Department[]> {
        return this.DepartmentService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id:string): Promise<Department | null>{
      return this.DepartmentService.findOne(id);
    }

    @Post()
  async   create(@Body() data:Prisma.DepartmentCreateInput): Promise<Department>{
        return this.DepartmentService.create(data);
    }

    @Delete(':id')
  async  deleteOne(@Param('id') id:string): Promise<Department> {
        return this.DepartmentService.deleteOne(id);
    }

    @Put(':id')
    async updateOne(@Param('id') id:string, @Body() data: Prisma.DepartmentUpdateInput): Promise<Department> {
        return this.DepartmentService.updateOne(id, data);
    }

}