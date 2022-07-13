import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../model/task.entity';
import { Repository } from 'typeorm';
import { task } from '../types';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>,
  ) {}

  async createTask({ cron, url, body }: task): Promise<string> {
    return '1234';
  }

  async getAllTasks(): Promise<task[]> {
    return this.repo.find();
  }

  async getTaskById(id: string): Promise<task> {
    return {} as task;
  }

  async updateTaskById(id: string, t: task): Promise<string> {
    return '1234';
  }

  async deleteTaskById(id: string): Promise<string> {
    return 'Ok';
  }
}
