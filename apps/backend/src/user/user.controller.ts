import { Controller, Body, Post, Get, Param, Logger } from '@nestjs/common';
import { KeycloakAdminService } from '../keycloak-admin/keycloak-admin.service';
import { Observable, from, of, throwError } from 'rxjs';
import {
  mapTo,
  tap,
  switchMap,
  catchError,
  mergeMap,
  mergeAll,
  concatAll,
  last,
  toArray,
  scan,
  map,
} from 'rxjs/operators';
import { OrganizationService } from '../organization/organization.service';
import { ConfigService } from '@nestjs/config';
import { logger } from '../middleware/logger.middleware';

@Controller('user')
export class UserController {
  constructor(
    private keycloakAdminService: KeycloakAdminService,
    private organizationService: OrganizationService,
    private configService: ConfigService,
  ) {}
  @Post()
  registerUser(
    @Body('user') user: any,
    @Body('client') client: string,
    @Body('code') code: string,
  ): Observable<any> {
    return this.keycloakAdminService.registerUser(user).pipe(
      mergeMap(result => {
        if (result.code === 200) {
          return this.organizationService.invitationDeleteCode(code);
        } else {
          return throwError('用户注册失败');
        }
      }),
      // tap(value => console.log(value)),
      mergeMap(result => {
        if ((result.status || result.code) === 200) {
          return of({ code: 200, data: '注册成功' });
        } else {
          return throwError('用户注册失败');
        }
      }),
      catchError(error => {
        return of({ code: 500, error: error });
      }),
    );
  }
  @Get('check/username/:username')
  checkUserName(@Param('username') username: string): Observable<any> {
    return this.keycloakAdminService.findUserByUserName(username, null);
  }
  @Get('check/email/:email')
  checkEmail(@Param('email') email: string): Observable<any> {
    return this.keycloakAdminService.findUserByUserName(null, email);
  }

  @Get('testRole')
  testRoleMapping(): Observable<any> {
    const userid = '';
    const userroles = ['CoreEnterprise'];
    const customerroles: Record<
      string,
      Record<string, Array<string>>
    > = this.configService.get('customerroles');
    const clients: Array<string> = Object.keys(customerroles);
    // ---userid-----------------
    // ---{A client,customerroles}----------------Aclientid----------Aclient rolelist-----Aclient filter roles----------A{userid,clientid,roles}
    // ---{A client,customerroles}----------------Bclientid----------Bclient rolelist-----Bclient filter roles----------B{userid,clientid,roles}
    const clientid = from(clients).pipe(
      mergeMap(client =>
        this.keycloakAdminService.kcAdminClient.clients.find({
          clientId: client,
        }),
      ),
      mergeMap(clients => of(...clients)),
      map(client => ({ id: client.id, clientId: client.clientId })),
    );
    const rolelist = clientid.pipe(
      mergeMap(client =>
        from(
          this.keycloakAdminService.kcAdminClient.clients.listRoles({
            id: client.id,
          }),
        ).pipe(
          map(rolelist => {
            let userrole = userroles.reduce(
              (pre, cur, i) => [...pre, ...customerroles[client.clientId][cur]],
              [],
            );
            userrole = Array.from(new Set(userrole));
            return rolelist.filter((role, i, list) => {
              return userrole.includes(role.name);
            });
          }),
          map(rolelist => ({
            uuid: client.id,
            clientId: client.clientId,
            roles: rolelist,
          })),
        ),
      ),
    );
    // const filterRoles = of(rolelist).pipe(
    // map(rolelist=>rolelist.filter((role,i,list)=>customerroles[clientid].includes(role.name)))
    // scan((acc, cur, i) => [cur, ...acc], []),)
    return rolelist.pipe(
      scan((acc, cur, i) => [cur, ...acc], []),
      last(),
      tap(v => Logger.log(v, '==3')),
    );
  }
}
