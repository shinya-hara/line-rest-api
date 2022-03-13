import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class LiffServerService {
  constructor(private httpService: HttpService) {}

  healthCheck() {
    return 'OK';
  }

  apps() {
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/todos/1', {})
      .pipe(map((response) => response.data));
  }
}
