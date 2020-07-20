import { Controller, Get, Param, Logger } from '@nestjs/common';
import { MessageService } from './message.service';
import { ConfigService } from '@nestjs/config';
import { Observable, of, throwError } from 'rxjs';
import { tap, map, switchMap, catchError, mergeMap } from 'rxjs/operators';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  /**
   * 获取验证码并返回失效秒数
   *
   * @param {string} phonenumber
   * @returns {Observable<any>}
   * @memberof MessageController
   */
  @Get('ali/send/:phonenumber')
  sendVertify(@Param('phonenumber') phonenumber: string): Observable<any> {
    return this.messageService.sendPhoneVertify(phonenumber).pipe(
      //   tap(result => {
      //     Logger.log(result, '发送验证码');
      //   }),
      map(result => {
        if (result && (result.code || result.status) === 200) {
          return { code: 200 };
        } else {
          return { code: 500, error: '获取验证码失败' };
        }
      }),
      mergeMap(result => {
        if (result.code === 200) {
          return this.messageService.getVertifyInvalidTime().pipe(
            map(result => {
              if (result && (result.code || result.status) === 200) {
                return { code: 200, data: result.data };
              } else {
                return throwError('获取验证码失效时间失败');
              }
            }),
          );
        } else {
          return of(result);
        }
      }),
      //   tap(result => {
      //
      //     Logger.log(result, '获取验证码失效时间');
      //   }),

      catchError(error => of({ code: 500, error })),
    );
  }
  /**
   * 校验验证码
   *
   * @param {string} phonenumber
   * @param {string} code
   * @returns {Observable<any>}
   * @memberof MessageController
   */
  @Get('ali/check/:phonenumber/:code')
  checkVertify(
    @Param('phonenumber') phonenumber: string,
    @Param('code') code: string,
  ): Observable<any> {
    return this.messageService.checkPhoneVertify(phonenumber, code).pipe(
      map(result => {
        if (result && (result.code || result.status) === 200) {
          return { code: 200 };
        } else {
          return { code: 500, error: '验证码发送失败' };
        }
      }),
      catchError(error => of({ code: 500, error })),
    );
  }
}
