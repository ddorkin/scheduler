import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { PERIOD_OF_CRON_LIST_UPDATING } from '../constants';

@Injectable()
export class CronService {
  constructor(private readonly cronRegistry: SchedulerRegistry) {}

  @Cron(PERIOD_OF_CRON_LIST_UPDATING)
  refreshCronList() {
    console.log('refresh'.repeat(10));
  }
}
