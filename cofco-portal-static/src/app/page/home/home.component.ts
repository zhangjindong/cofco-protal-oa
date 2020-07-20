import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  AfterContentInit,
  AfterViewInit,
} from '@angular/core';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { ScrollService } from 'src/app/shared/scroll.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentInit {
  constructor(private scrollS: ScrollService, private rd2: Renderer2) {}

  ngOnInit(): void {}
  ngAfterContentInit(): void {
    window.scroll(0, 0);
    this.scrollS.scroll.subscribe((h) => {
      if (h > 200) {
        let i = 0;
        for (const element of this.advantage.nativeElement.getElementsByClassName(
          'tac'
        )) {
          setTimeout(() => {
            element.classList.add('move-top');
          }, i * 300);
          i++;
        }
      }
      if (h > 900) {
        let i = 0;
        for (const element of this.introduce.nativeElement.getElementsByClassName(
          'tac'
        )) {
          setTimeout(() => {
            element.classList.add('move-top');
          }, i * 300);
          i++;
        }
      }
    });
  }

  @ViewChild(SwiperDirective, { static: false }) ionSlides?: SwiperDirective;
  @ViewChild('advantage')
  advantage: ElementRef;
  @ViewChild('introduce')
  introduce: ElementRef;
  public config: SwiperConfigInterface = {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    spaceBetween: 30,
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
  doStartAutoplay() {
    this.ionSlides.startAutoplay();
  }
}
