import { KeycloakService, KeycloakConfig } from 'keycloak-angular';

import { EnvService } from '../shared/env.service';

export function initializer(
  keycloak: KeycloakService,
  envService: EnvService,
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const keycloakEnv: any = await envService
          .getEnvs('keycloak')
          .toPromise();
        const keycloakConfig: KeycloakConfig = {
          url: keycloakEnv.url,
          clientId: keycloakEnv.web.client,
          realm: keycloakEnv.realm,
        };
        await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            // onLoad: 'login-required',
            onLoad: 'check-sso',
            checkLoginIframe: true,
            silentCheckSsoRedirectUri:
              window.location.origin + '/silent-check-sso.html',
          },
          bearerExcludedUrls: [],
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
