import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  /**
   * 校验邀请码
   *
   * @param {string} code
   * @returns {Observable<any>}
   * @memberof OrganizationService
   */
  invitationCheckCode(code: string): Observable<any> {
    return this.httpService.get(
      `${this.configService.get(
        'service.orgAddress',
      )}/customer/invitation/check/${code}`,
    );
  }
  /**
   * 查看机构基础信息
   *
   * @param {string} oid
   * @returns {Observable<any>}
   * @memberof OrganizationService
   */
  getInvitation(oid: string): Observable<any> {
    return this.httpService.get(
      `${this.configService.get(
        'service.orgAddress',
      )}/customer/baseinfo/${oid}`,
    );
  }
  /**
   * 删除邀请码
   *
   * @param {string} code
   * @returns {Observable<any>}
   * @memberof OrganizationService
   */
  invitationDeleteCode(code: string): Observable<any> {
    return this.httpService.delete(
      `${this.configService.get(
        'service.orgAddress',
      )}/customer/invitation/${code}`,
    );
  }
}
