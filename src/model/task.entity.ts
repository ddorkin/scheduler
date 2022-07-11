import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  // todo: а как насчёт поля method ???
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  body: string;

  @Column()
  cron: string;
}
