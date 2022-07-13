import { Task } from '../../model/task.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEnum, IsString } from 'class-validator';
import { IsCron } from '@kovalenko/is-cron';
import { ITask, Methods } from '../interfaces/task.interface';
import { PrimaryGeneratedColumn } from 'typeorm';
import { InputOptions } from 'cron-validate/lib/types';

const cronOptions: InputOptions = {
  override: {
    useSeconds: true,
  },
};

// todo: swagger аннотации можно убрать нафиг
export class TaskDTO implements Readonly<Task> {
  @ApiModelProperty({ required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty({ required: true })
  @IsString()
  @IsCron(cronOptions, { each: true })
  cron: string;

  @ApiModelProperty({ required: true })
  @IsString()
  url: string;

  @ApiModelProperty({ required: true })
  @IsEnum(Methods)
  method: Methods;

  @ApiModelProperty({ required: false })
  body: string;

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
