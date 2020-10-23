import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit , AfterContentInit{
  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    window.scroll(0, 0);
  }
}
