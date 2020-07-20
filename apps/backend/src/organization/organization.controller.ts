import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Controller('cus')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}
  @Get('invitation/:code')
  getInvitation(@Param() params): Observable<any> {
    return this.organizationService.invitationCheckCode(params.code).pipe(
      map((value: any) => value.data),
      switchMap(value => this.organizationService.getInvitation(value)),
      map(result => {
        if (result.status === 200 && result.data) {
          return { code: 200, data: result.data };
        } else {
          return { code: 200, data: null };
        }
      }),
    );
  }
}
