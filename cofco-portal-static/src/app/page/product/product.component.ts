import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterContentInit,
} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterContentInit {
  constructor(protected keycloakService: KeycloakService) {}
  ngAfterContentInit(): void {
    window.scroll(0, 0);
  }
  public selectCPNum = 0;
  public coreweb = '';
  ngOnInit(): void {
    this.coreweb = window['links'].coreweb;
  }

  // async doLogin() {
  //   if (await this.keycloakService.isLoggedIn()) {
  //     this.userDetails = await this.keycloakService.loadUserProfile();
  //   } else {
  //     await this.keycloakService.login();
  //   }
  // }
}
