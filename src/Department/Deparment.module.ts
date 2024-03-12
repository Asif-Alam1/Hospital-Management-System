import { Module } from '@nestjs/common';
import { DepartmentController } from './Deparment.controller';
import { DepartmentService } from './DepartmentService.service';


@Module({
  imports: [],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
