import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakAdminController } from './keycloak-admin.controller';

describe('KeycloakAdmin Controller', () => {
  let controller: KeycloakAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeycloakAdminController],
    }).compile();

    controller = module.get<KeycloakAdminController>(KeycloakAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
