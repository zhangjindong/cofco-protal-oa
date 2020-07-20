import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svg-line',
  templateUrl: './svg-line.component.html',
  styleUrls: ['./svg-line.component.scss'],
})
export class SvgLineComponent implements OnInit {
  constructor() {}
  @Input() color = '#fff';
  ngOnInit() {}
}
