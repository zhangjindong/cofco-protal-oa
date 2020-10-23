import { Component, Input, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    // trigger('fixedHeader', [
    //   state(
    //     'open',
    //     style({
    //       height: '200px',
    //       opacity: 1,
    //       backgroundColor: 'yellow',
    //     })
    //   ),
    //   state(
    //     'closed',
    //     style({
    //       height: '100px',
    //       opacity: 0.5,
    //       backgroundColor: 'green',
    //     })
    //   ),
    //   transition('open => closed', [animate('1s')]),
    //   transition('closed => open', [animate('0.5s')]),
    // ]),
  ],
})
export class HeaderComponent implements OnInit {
  constructor(
    private eventM: EventManager,
    protected keycloakService: KeycloakService,
  ) {}
  @Input()
  fixedHeader = false;

  userDetails: KeycloakProfile;

  async ngOnInit() {
    if (!this.fixedHeader) {
      this.eventM.addGlobalEventListener(
        'window',
        'scroll',
        ({ currentTarget }) => {
          let h = currentTarget.scrollY;
          setTimeout(() => {
            if (h > 110) {
              this.fixedHeader = true;
            } else {
              this.fixedHeader = false;
            }
          }, 20);
        },
      );
    }
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
    }
  }
  async doLogout() {
    await this.keycloakService.logout();
  }
  async doRegister() {
    await this.keycloakService.register();
  }
  async doLogin() {
    await this.keycloakService.login();
  }
}
