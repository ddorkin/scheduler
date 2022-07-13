import { CronService } from './cron.service';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../model/task.entity';
import { HttpModule } from '@nestjs/axios';

import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    HttpModule,
  ],
  providers: [CronService],
  controllers: [],
  exports: [],
})
export class CronModule {}
