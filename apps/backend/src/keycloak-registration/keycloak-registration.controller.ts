import {
  Controller,
  Get,
  Post,
  Body,
  Type,
  Param,
  Query,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Registration } from './registration';
import { KeycloakRegistrationService } from './keycloak-registration.service';
import { ConfigService } from '@nestjs/config';
@ApiTags('keycloak-registration')
@Controller('keycloak-registration')
export class KeycloakRegistrationController {
  constructor(
    private config: ConfigService,
    private keycloakRegistration: KeycloakRegistrationService,
  ) {}
  @Get()
  clientRegistration(
    @Query('accessToken') accessToken: string,
  ): Observable<any> {
    const keycloakConfig = this.config.get('keycloak');
    return this.keycloakRegistration.createClient(
      {
        accessToken,
        endpoint: `${this.config.get('keycloak.url')}/realms/${this.config.get(
          'keycloak.realmName',
        )}/clients-registrations`,
      },
      {
        clientId: this.config.get('keycloak.api.client'),
        serviceAccountsEnabled: true,
        adminUrl: keycloakConfig.adminUrl,
        bearerOnly: true,
        secret: keycloakConfig.api.secret,
        name: keycloakConfig.api.name,
        description: keycloakConfig.api.description,
        // baseUrl: keycloakConfig.adminUrl,
        // rootUrl: keycloakConfig.adminUrl,
        // redirectUris: [`${keycloakConfig.adminUrl}/*`],
        // webOrigins: [keycloakConfig.adminUrl, '*'],
      },
    );
  }
}
