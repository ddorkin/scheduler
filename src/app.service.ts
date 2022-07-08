import { Injectable } from '@nestjs/common';
import { task } from './types';

@Injectable()
export class AppService {
  async createTask({ cron, url, body }: task): Promise<string> {
    return '1234';
  }

  async getAllTasks(): Promise<task[]> {
    return [] as task[];
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
