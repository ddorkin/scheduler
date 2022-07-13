export interface ITask {
  id: string;
  cron: string;
  url: string;
  method: Methods;
  body?: string;
}

export enum Methods {
  PUT = 'PUT',
  DELETE = 'DELETE',
  POST = 'POST',
  GET = 'GET',
}
