import { Module } from "@nestjs/common";
import { AppointmentController } from "./AppointmentController.controller";
import { DepartmentService } from "src/Department/DepartmentService.service";
import { PrismaService } from "src/prisma.service";
import { AppointmentService } from "./AppointmentService.service";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    JwtModule.register({
      secret: 'fsrEBGmlpuAJPwJ0gs5AUQ==', // Hashed Secret Key
      signOptions: { expiresIn: '2h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService,PrismaService,AuthGuard,AdminGuard],
})
export class AppointmentModule {}