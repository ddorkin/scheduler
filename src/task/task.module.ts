import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../model/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), HttpModule],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [],
})
export class TaskModule {}
