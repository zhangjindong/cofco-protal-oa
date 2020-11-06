import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  name='asdf'
  getHello(): string {
    return 'Hello World!';
  }
}
