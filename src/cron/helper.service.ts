import { Injectable } from '@nestjs/common';
import { Task } from '../model/task.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HelperService {
  constructor(private readonly httpService: HttpService) {}

  public async sendTaskRequest(task: Task): Promise<void> {
    const method = task.method.toLowerCase();
    const url = task.url;
    const body = task.body ? JSON.parse(task.body) : task.body;
    try {
      const response = await this.httpService.axiosRef[method](url, body);
      console.log(
        'Request has been sent. Response is',
        response.status,
        response.data.toString().substring(0, 20),
      );
    } catch (e) {
      console.error(
        `Error upon request sending for task id ${task.id}, url ${task.url} method ${task.method} body ${task.body}`,
        JSON.stringify(e).substring(0, 200),
      );
    }

    return;
  }

  public getTaskListDiff(oldList: Task[], newList: Task[]): Task[] {
    const isTaskIncluded = (arr, t) => {
      return arr.find((el) => el.id === t.id);
    };

    return oldList
      .filter((task) => !isTaskIncluded(newList, task))
      .concat(newList.filter((task) => !isTaskIncluded(oldList, task)));
  }
}
