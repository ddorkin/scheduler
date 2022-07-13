import { Task } from '../../model/task.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { IsCron } from '@kovalenko/is-cron';
import { ITask, Methods } from '../interfaces/task.interface';

export class TaskDTO implements Readonly<Task> {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true })
  @IsString()
  @IsCron()
  cron: string;

  @ApiModelProperty({ required: true })
  @IsString()
  url: string;

  @ApiModelProperty({ required: true })
  @IsEnum(Methods)
  method: Methods;

  @ApiModelProperty({ required: false })
  @IsString()
  body: string;

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

  public toEntity(task: ITask = null) {
    const it = new Task();
    it.id = task.id;
    it.cron = task.cron;
    it.url = task.url;
    it.body = task.body;
    it.method = task.method;

    return it;
  }
}
