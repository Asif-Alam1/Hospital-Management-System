import { Module } from '@nestjs/common';
import { DepartmentController } from './Deparment.controller';
import { DepartmentService } from './DepartmentService.service';
import { PrismaService } from 'src/prisma.service';


@Module({
  imports: [],
  controllers: [DepartmentController],
  providers: [DepartmentService,PrismaService],
})
export class DepartmentModule {}
