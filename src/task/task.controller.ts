import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';

// todo: нужно дописать остальные методы для работы с кронами (добавление, изменение, удаление)
@Controller('task')
export class TaskController {
  constructor(private serv: TaskService) {}

  @Get()
  public async getAll() {
    return this.serv.getAll();
  }
}
