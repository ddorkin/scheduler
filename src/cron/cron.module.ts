import { CronService } from './cron.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../model/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [CronService],
  controllers: [],
  exports: [],
})
export class CronModule {}
