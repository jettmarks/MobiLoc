import {Creds} from "../creds/creds.service";
/**
 * Configuration of the REST API provider.
 * @param RestangularProvider
 * @constructor
 */
export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl('https://player-test.clueride.com/rest');

  RestangularProvider.setDefaultHeaders({
    'Authorization': 'Bearer GuestToken'
  });

  RestangularProvider.addFullRequestInterceptor(
    (element, operation, path, url, headers, params) => {
      let bearerToken = Creds.getBearerToken();

      return {
        headers: Object.assign({}, headers, {Authorization: `Bearer ${bearerToken}`})
      };
  });
}

