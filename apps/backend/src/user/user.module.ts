import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { KeycloakAdminModule } from '../keycloak-admin/keycloak-admin.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [KeycloakAdminModule, OrganizationModule],
  controllers: [UserController],
})
export class UserModule {}
