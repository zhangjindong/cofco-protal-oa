import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  constructor(private http: HttpClient) {}
  /**
   * 获取环境变量
   *
   * @returns {Observable<any>}
   * @memberof EnvService
   */
  getEnvs(env: string): Observable<any> {
    return this.http.get(`/api/env/${env}`);
  }
}
