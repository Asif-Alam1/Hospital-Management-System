import { Module } from "@nestjs/common";
import { AppointmentController } from "./AppointmentController.controller";
import { DepartmentService } from "src/Department/DepartmentService.service";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [],
  controllers: [AppointmentController],
  providers: [DepartmentService,PrismaService],
})
export class AppointmentModule {}