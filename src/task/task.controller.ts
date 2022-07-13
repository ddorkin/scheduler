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
import { task } from '../types';

// todo: добавить путь
// todo: добавить валидаторы
// todo: нужно дописать остальные методы для работы с кронами (добавление, изменение, удаление)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<task[]> {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() t: task): Promise<string> {
    return this.taskService.createTask(t);
  }

  @Put('/:id')
  async updateTaskById(
    @Param('id') id: string,
    @Body() t: task,
  ): Promise<string> {
    return this.taskService.updateTaskById(id, t);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<string> {
    return this.taskService.deleteTaskById(id);
  }
}
