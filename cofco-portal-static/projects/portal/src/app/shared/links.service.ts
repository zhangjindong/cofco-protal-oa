import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor(private http: HttpClient) {}
  /**
   * 获取连接环境变量
   *
   * @returns {Observable<any>}
   * @memberof LinksService
   */
  getLinks(): Observable<any> {
    return this.http.get(`/api/links`);
  }
}
