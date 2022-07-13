import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Methods } from '../task/interfaces/task.interface';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Methods,
    default: Methods.GET,
  })
  method: Methods;

  @Column({ type: 'varchar', length: 2000 })
  url: string;

  @Column({ type: 'varchar', length: 3000 })
  body: string;

  @Column({ type: 'varchar', length: 50 })
  cron: string;
}
