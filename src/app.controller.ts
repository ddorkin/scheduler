import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { task } from './types';

// todo: добавить путь
// todo: добавить валидаторы
@Controller('/model')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllTasks(): Promise<task[]> {
    return this.appService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<task> {
    return this.appService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() t: task): Promise<string> {
    return this.appService.createTask(t);
  }

  @Put('/:id')
  async updateTaskById(
    @Param('id') id: string,
    @Body() t: task,
  ): Promise<string> {
    return this.appService.updateTaskById(id, t);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<string> {
    return this.appService.deleteTaskById(id);
  }
}
