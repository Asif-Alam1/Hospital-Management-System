import { Controller,Get,Post,Delete,Param,Body,Put,UseGuards } from "@nestjs/common";
import{ DepartmentService } from "./DepartmentService.service";
import { Department,Prisma } from "@prisma/client";
import { AdminGuard } from "src/guards/admin.guard";


@Controller('Department')
export class DepartmentController {
    constructor(private DepartmentService:DepartmentService) {}
    @Get()
    @UseGuards(AdminGuard)
  async  findAll(): Promise<Department[]> {
        return this.DepartmentService.findAll();
    }
    @Get(':id')
    @UseGuards(AdminGuard)
    async findOne(@Param('id') id:string): Promise<Department | null>{
      return this.DepartmentService.findOne(id);
    }

    @Post()
    @UseGuards(AdminGuard)
  async   create(@Body() data:Prisma.DepartmentCreateInput): Promise<Department>{
        return this.DepartmentService.create(data);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
  async  deleteOne(@Param('id') id:string): Promise<Department> {
        return this.DepartmentService.deleteOne(id);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    async updateOne(@Param('id') id:string, @Body() data: Prisma.DepartmentUpdateInput): Promise<Department> {
        return this.DepartmentService.updateOne(id, data);
    }

    @Get(':id/doctors')
    @UseGuards(AdminGuard)
    async findDoctors(@Param('id') id: string): Promise<any> {
        return this.DepartmentService.findDoctors(id);
    }
}