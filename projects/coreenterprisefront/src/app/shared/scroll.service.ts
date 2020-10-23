import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  public scroll = fromEvent(window, 'scroll').pipe(
    map((event) => event.currentTarget['scrollY'])
  );
  constructor() {}
}
