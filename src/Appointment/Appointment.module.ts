import { Module } from "@nestjs/common";
import { AppointmentController } from "./AppointmentController.controller";
import { DepartmentService } from "src/Department/DepartmentService.service";
import { PrismaService } from "src/prisma.service";
import { AppointmentService } from "./AppointmentService.service";

@Module({
  imports: [],
  controllers: [AppointmentController],
  providers: [AppointmentService,PrismaService],
})
export class AppointmentModule {}