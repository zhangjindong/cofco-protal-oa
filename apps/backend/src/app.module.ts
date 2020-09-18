import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AngularModule } from './angular/angular.module';
import { ConfigModule } from '@nestjs/config';
import { OrganizationModule } from './organization/organization.module';
import { KeycloakAdminModule } from './keycloak-admin/keycloak-admin.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { KeycloakRegistrationModule } from './keycloak-registration/keycloak-registration.module';
import configuration from './config/configuration';

@Module({
  imports: [
    AngularModule.forRoot({
      rootPath: 'dist/www',
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    OrganizationModule,
    KeycloakAdminModule,
    UserModule,
    MessageModule,
    KeycloakRegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
