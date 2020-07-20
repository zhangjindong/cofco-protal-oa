import { Injectable, HttpService, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MessageService {
  constructor(
    private configService: ConfigService,
    private http: HttpService,
  ) {}
  /**
   * 验证码失效时间
   *
   * @returns {Observable<any>}
   * @memberof MessageService
   */
  getVertifyInvalidTime(): Observable<any> {
    return this.http.get<number>(
      `${this.configService.get(`service.messageAddress`)}/aliMessage/vertify/`,
    );
  }
  /**
   * 获取手机验证码
   *
   * @param {string} phonenumber
   * @returns {Observable<any>}
   * @memberof MessageService
   */
  sendPhoneVertify(phonenumber: string): Observable<any> {
    return this.http
      .get(
        `${this.configService.get(
          `service.messageAddress`,
        )}/aliMessage/vertify/${phonenumber}`,
      )
      .pipe(
        catchError(error => {
          Logger.error(error);
          return of({ code: 500, error });
        }),
      );
  }
  /**
   * 校验验证码
   *
   * @param {string} phonenumber
   * @param {string} code
   * @returns {Observable<any>}
   * @memberof MessageService
   */
  checkPhoneVertify(phonenumber: string, code: string): Observable<any> {
    return this.http.get(
      `${this.configService.get(
        `service.messageAddress`,
      )}/aliMessage/vertify/${phonenumber}/${code}`,
    );
  }
}
