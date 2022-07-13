import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import {
  DB_EXTRACTION_JOB_NAME,
  PERIOD_OF_CRON_LIST_UPDATING,
} from '../constants';
import { Cache } from 'cache-manager';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../model/task.entity';
import { Repository } from 'typeorm';
import _ from 'lodash';
import { CronJob } from 'cron';

@Injectable()
export class CronService {
  taskList = [];
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Task) private readonly repo: Repository<Task>,
  ) {}

  // 1. Сначала проверяем, что она не находится в редисе по айдишнику
  // 2. Если находится, значит пропускаем выполнение
  // 3. Иначе выставляем значение в редисе (блокируем выполнение другими инстансами по айдишнику),
  //    причём выставляем ttl на одну минуту (время ожидания запроса), если сервис отвалится, то что поделать
  // 4. Выполняем джобу
  // 5. Снимаем блокировку с редиса
  private async executeCommonJob(task: Task): Promise<void> {
    return;
  }

  private static getTaskListDiff(oldList: Task[], newList: Task[]): Task[] {
    const isTaskIncluded = (arr, t) => {
      return arr.find((el) => el.id === t.id);
    };

    return oldList
      .filter((task) => !isTaskIncluded(newList, task))
      .concat(newList.filter((task) => !isTaskIncluded(oldList, task)));
    // return _.xor<Task>(oldList, newList);
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
    taskList.forEach((task) => {
      // todo: вот интересно он async нормально скушает ???
      const job = new CronJob(task.cron, async () => {
        await this.executeCommonJob(task);
        console.log(task.id, task.cron, 'executed'.repeat(10));
      });

      this.schedulerRegistry.addCronJob(task.id.toString(), job);
      job.start();
    });
  }

  @Cron(PERIOD_OF_CRON_LIST_UPDATING, {
    name: DB_EXTRACTION_JOB_NAME,
  })
  async refreshCronList() {
    // todo: for debug purposes
    console.log('refresh'.repeat(10));

    const key = randomUUID();
    console.log('key'.repeat(10), key);
    await this.cacheManager.set(key, key, { ttl: 3000 });
    const tasksFromDB = await this.repo.find();

    console.log(tasksFromDB.length, tasksFromDB[0]);

    const isDiff =
      CronService.getTaskListDiff(this.taskList, tasksFromDB).length > 0;

    if (isDiff) {
      this.taskList = tasksFromDB;
      this.createCronJobs(this.taskList);
    }

    /**
     *
     * todo:
     * 1. получить список всех джоб из базы данных
     * 2. проверить, если ли локально уже список этих джоб
     * 3. если есть, то проверить дифф, если дифф есть, то обновить джобы (в дальнейшем можно обновить только сам дифф)
     * 4. если списка нет, то создаем крон-джобы
     *
     * todo:
     * далее, когда выполняется крона
     * 1. Сначала проверяем, что она не находится в редисе по айдишнику
     * 2. Если находится, значит пропускаем выполнение
     * 3. Иначе выставляем значение в редисе (блокируем выполнение другими инстансами по айдишнику),
     *    причём выставляем ttl на одну минуту (время ожидания запроса), если сервис отвалится, то что поделать
     * 4. Выполняем джобу
     * 5. Снимаем блокировку с редиса
     *
     */
  }
}
