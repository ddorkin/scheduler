import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { PERIOD_OF_CRON_LIST_UPDATING } from '../constants';

@Injectable()
export class CronService {
  constructor(private readonly cronRegistry: SchedulerRegistry) {}

  @Cron(PERIOD_OF_CRON_LIST_UPDATING)
  refreshCronList() {
    // todo: for debug purposes
    console.log('refresh'.repeat(10));

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
