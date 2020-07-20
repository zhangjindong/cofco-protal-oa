import { KeycloakConfig } from 'keycloak-angular';
import env from './env';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: env.url,
  realm: env.realm,
  clientId: env.clientId,
  //   credentials: { secret: 'd75973b8-962e-4a5f-b8a8-8515c35b34ec' },
};

export const environment = {
  SERVER_URL: '',
  production: false,
  useHash: true,
  hmr: false,
  keycloakConfig,
};
