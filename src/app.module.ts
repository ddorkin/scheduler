import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './model/task.entity';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { CronController } from './cron/cron.controller';
import { CronService } from './cron/cron.service';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    // todo: если что можно сделать config.service.ts
    // todo: и можно поменять названия базы данных как здесь, так и в докер компоузе
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Task],
    }),
    TaskModule,
    CronModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
