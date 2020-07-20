import { KeycloakService } from 'keycloak-angular';

import { environment } from '../../environments/environment';
import { EnvService } from '../shared/env.service';

export function initializer(
  keycloak: KeycloakService,
  envService: EnvService,
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const { keycloakConfig } = environment;
      try {
        const keycloakEnv: any = await envService
          .getEnvs('keycloak')
          .toPromise();
        keycloakConfig.url = keycloakEnv.url;
        await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            // onLoad: 'login-required',
            onLoad: 'check-sso',
            checkLoginIframe: true,
            silentCheckSsoRedirectUri:
              window.location.origin +
              (environment.production ? '' : '') +
              '/silent-check-sso.html',
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
