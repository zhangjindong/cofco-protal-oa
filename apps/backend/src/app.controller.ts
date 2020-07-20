import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Observable, from, of, throwError } from 'rxjs';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get('links')
  getLinks(): string {
    return this.configService.get('links');
  }
  @Get('env/:env')
  getEnvs(@Param() params): string {
    return this.configService.get(params.env);
  }
  @Get('hello')
  hello(): Observable<any> {
    return from([1, 2, 3, 4, 5, 6]).pipe(
      tap(v => Logger.log(v)),
      map(v => v + 1),
      mergeMap(v => {
        if (v == 3) {
          Logger.log('00000');
          return throwError('不存在3');
        } else {
          return of({ code: 200, data: v });
        }
      }),

      mergeMap(v => {
        Logger.log('1111');
        if (v.code !== 200) {
          return throwError('不存在4');
        } else {
          return of({ code: 200, data: v.data * 2 });
        }
      }),
      catchError(err => {
        Logger.log(err);
        return of({ code: 500, err });
      }),
    );
  }
}
