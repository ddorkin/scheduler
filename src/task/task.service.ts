import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../model/task.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  public async getAll() {
    // todo: for debug purposes
    const method = 'GET'.toLowerCase();
    const url = 'https://google.com';
    const body = {};
    const response = await this.httpService.axiosRef[method](url, body);
    console.log('debug '.repeat(10), response.status);

    return await this.repo.find();
  }
}
