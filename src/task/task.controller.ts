import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ITask } from './interfaces/task.interface';
import { TaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<TaskDTO[]> {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<ITask> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() t: TaskDTO): Promise<string> {
    return this.taskService.createTask(t);
  }

  @Put('/:id')
  async updateTaskById(
    @Param('id') id: string,
    @Body() t: TaskDTO,
  ): Promise<string> {
    return this.taskService.updateTaskById(id, t);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<string> {
    return this.taskService.deleteTaskById(id);
  }
}
