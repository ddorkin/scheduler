import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import {
  DB_EXTRACTION_JOB_NAME,
  PERIOD_OF_CRON_LIST_UPDATING,
} from '../constants';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../model/task.entity';
import { Repository } from 'typeorm';
import { CronJob } from 'cron';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CronService {
  taskList = [];
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Task) private readonly repo: Repository<Task>,
    private readonly httpService: HttpService,
  ) {}

  // todo: вынести в utils
  private async sendTaskRequest(task: Task): Promise<void> {
    const method = task.method.toLowerCase();
    const url = task.url;
    const body = task.body;
    // todo: надо проверить body, JSON.stringify ???
    const response = await this.httpService.axiosRef[method](url, body);

    console.log(
      'Request has been sent. Response is',
      response.status,
      response.data.toString().substring(0, 20),
    );

    return;
  }

  private async executeCommonJob(task: Task): Promise<void> {
    const id = task.id.toString();
    try {
      const value = await this.cacheManager.get<string>(id);
      if (value) {
        return;
      }

      await this.cacheManager.set<string>(id, id, { ttl: 60 });
      await this.sendTaskRequest(task);

      await this.cacheManager.del(id);
    } catch (ex) {
      console.error('Execution of a job has been failed', ex);
    }
  }

  // todo: вынести в utils
  private static getTaskListDiff(oldList: Task[], newList: Task[]): Task[] {
    const isTaskIncluded = (arr, t) => {
      return arr.find((el) => el.id === t.id);
    };

    return oldList
      .filter((task) => !isTaskIncluded(newList, task))
      .concat(newList.filter((task) => !isTaskIncluded(oldList, task)));
  }

  private flushCronJobs(): void {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key) => {
      if (key == DB_EXTRACTION_JOB_NAME) {
        return;
      }
      this.schedulerRegistry.deleteCronJob(key);
    });
  }

  private createCronJobs(taskList: Task[]): void {
    this.flushCronJobs();
    taskList.forEach((task) => {
      const job = new CronJob(task.cron, async () => {
        await this.executeCommonJob(task);
        console.log(task.id, task.cron, 'executed');
      });

      this.schedulerRegistry.addCronJob(task.id.toString(), job);
      job.start();
    });
  }

  @Cron(PERIOD_OF_CRON_LIST_UPDATING, {
    name: DB_EXTRACTION_JOB_NAME,
  })
  async refreshCronList() {
    const tasksFromDB = await this.repo.find();

    console.log('Tasks from DB', tasksFromDB.length);

    const isDiff =
      CronService.getTaskListDiff(this.taskList, tasksFromDB).length > 0;

    if (isDiff) {
      this.taskList = tasksFromDB;
      this.createCronJobs(this.taskList);
    }
  }
}
