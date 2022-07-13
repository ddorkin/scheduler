import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async createTask(dto: TaskDTO): Promise<string> {
    const result = await this.repo
      .save(dto.toEntity())
      .then((t) => TaskDTO.fromEntity(t));
    return result.id;
  }

  async getAllTasks(): Promise<TaskDTO[]> {
    return this.repo
      .find()
      .then((tasks) => tasks.map((e) => TaskDTO.fromEntity(e)));
  }

  async getTaskById(id: string): Promise<TaskDTO> {
    return this.repo.findOneBy({ id }).then((task) => {
      if (!task) {
        // todo: походу нужно использовать фильтры для этого
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
      }
      return TaskDTO.fromEntity(task);
    });
  }

  async updateTaskById(id: string, t: ITask): Promise<string> {
    return '1234';
  }

  async deleteTaskById(id: string): Promise<string> {
    return 'Ok';
  }
}
