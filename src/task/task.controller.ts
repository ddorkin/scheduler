import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private serv: TaskService) {}

  @Get()
  public async getAll() {
    return this.serv.getAll();
  }
}
