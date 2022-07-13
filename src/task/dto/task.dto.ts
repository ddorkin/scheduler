import { Task } from '../../model/task.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsCron } from '@kovalenko/is-cron';
import { ITask, Methods } from '../interfaces/task.interface';
import { PrimaryGeneratedColumn } from 'typeorm';
import { InputOptions } from 'cron-validate/lib/types';

const cronOptions: InputOptions = {
  override: {
    useSeconds: true,
  },
};

export class TaskDTO implements Readonly<Task> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsCron(cronOptions, { each: true })
  cron: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  body: string;

  @IsEnum(Methods)
  method: Methods;

  // todo: так, а эти методы мне действительно нужны пока ???
  public static from(dto: Partial<TaskDTO>) {
    const it = new TaskDTO();
    it.id = dto.id;
    it.cron = dto.cron;
    it.url = dto.url;
    it.body = dto.body;
    it.method = dto.method;

    return it;
  }

  public static fromEntity(entity: ITask) {
    return this.from({
      id: entity.id,
      cron: entity.cron,
      url: entity.url,
      body: entity.body,
      method: entity.method,
    });
  }

  public toEntity() {
    const it = new Task();
    it.id = this.id;
    it.cron = this.cron;
    it.url = this.url;
    it.body = this.body;
    it.method = this.method;

    return it;
  }
}
