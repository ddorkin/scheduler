import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  // todo: а как насчёт поля method ???
  // todo: видимо можно добавить какие-нибудь ещё поля
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', default: 'GET' })
  method: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar', default: null })
  body: string;

  @Column({ type: 'varchar' })
  cron: string;
}
