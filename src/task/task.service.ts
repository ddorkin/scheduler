import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../model/task.entity';
import { Repository } from 'typeorm';
import { ITask } from './interfaces/task.interface';
import { TaskDTO } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>,
  ) {}

  async createTask({ cron, url, body }: ITask): Promise<string> {
    // this.repo.save<Task>;
    return '1234';
  }

  async getAllTasks(): Promise<TaskDTO[]> {
    return this.repo
      .find()
      .then((tasks) => tasks.map((e) => TaskDTO.fromEntity(e)));
  }

  async getTaskById(id: string): Promise<ITask> {
    return {} as ITask;
  }

  async updateTaskById(id: string, t: ITask): Promise<string> {
    return '1234';
  }

  async deleteTaskById(id: string): Promise<string> {
    return 'Ok';
  }
}
