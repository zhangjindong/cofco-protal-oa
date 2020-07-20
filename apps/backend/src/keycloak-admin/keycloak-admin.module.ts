import { Module } from '@nestjs/common';
import { KeycloakAdminService } from './keycloak-admin.service';
import { KeycloakAdminController } from './keycloak-admin.controller';
import KcAdminClient from 'keycloak-admin';
import { ConfigService } from '@nestjs/config';
@Module({
  providers: [KeycloakAdminService, KcAdminClient],
  controllers: [KeycloakAdminController],
  exports: [KeycloakAdminService],
})
export class KeycloakAdminModule {}
