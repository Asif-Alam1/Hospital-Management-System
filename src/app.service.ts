import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getName(): string {
    return 'Hello Asif';
  }

    findAll(): string {
    return "This action returns all cats";
  }
}
