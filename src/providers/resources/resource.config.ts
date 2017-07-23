/**
 * Configuration of the REST API provider.
 * @param RestangularProvider
 * @constructor
 */
export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost:8080/rest');

  RestangularProvider.setDefaultHeaders({
    'Authorization': 'Bearer tempAuth'
  })
}

