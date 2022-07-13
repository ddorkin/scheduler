import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Methods } from '../task/interfaces/task.interface';

@Entity({ name: 'tasks' })
export class Task {
  // todo: а как насчёт поля method ???
  // todo: видимо можно добавить какие-нибудь ещё поля
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Methods,
    default: Methods.GET,
  })
  method: Methods;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar', default: null })
  body: string;

  @Column({ type: 'varchar' })
  cron: string;
}
