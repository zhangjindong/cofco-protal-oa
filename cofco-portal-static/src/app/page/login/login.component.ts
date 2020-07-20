import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('warp')
  warp: ElementRef;
  constructor(protected keycloakAngular: KeycloakService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.warp.nativeElement.classList.toggle('on');
    }, 1000);
  }
  login() {
    this.keycloakAngular.login();
  }
}
