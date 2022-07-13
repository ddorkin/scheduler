import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../model/task.entity';
import { Repository } from 'typeorm';
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
    const task = await this.repo.findOneBy({ id });
    if (!task) {
      // todo: походу нужно использовать фильтры для этого
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    return TaskDTO.fromEntity(task);
  }

  async updateTaskById(id: string, t: TaskDTO): Promise<string> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    await this.repo.update(id, t);
    // todo: на создание, изменение и удаление можно фаерить эвенты, чтобы вызывать обновления джоб, но это будет нифига не персистентно, потому что много инстансов
    return id;
  }

  async deleteTaskById(id: string): Promise<string> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    await this.repo.delete(id);
    return id;
  }
}
