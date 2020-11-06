import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller('hello')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {debugger;}

  @Get()
  getHello(): string {
    console.dir(this);

    return JSON.stringify(this);
  }
}
