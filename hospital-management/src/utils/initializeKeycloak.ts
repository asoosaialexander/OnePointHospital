import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.issuer,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true
      },
      bearerExcludedUrls: []
    });
}