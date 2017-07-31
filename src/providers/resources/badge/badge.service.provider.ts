import {Creds} from "../../creds/creds.service";
import {OpaqueToken} from "@angular/core";
import {Restangular} from "ngx-restangular/dist/esm/src";

export const BADGES_REST = new OpaqueToken('BadgeResource');

export function BadgesRestFactory(
  restangular: Restangular,
) {
  /* Configure this particular resource to capture the Authentication-Token header. */
  restangular.withConfig(
    (configurer) => {
      configurer.addResponseInterceptor(
        (data, operation, what, url, response) => {
          if (response.headers.get('Authentication-Token')) {
            Creds.setAuthToken(response.headers.get('Authentication-Token'));
          }
          /* Response Interceptors are required to return the data property */
          return data;
        }
      );
    }
  );

  /* The path for this API endpoint */
  return restangular.service('login');
}

export let badgeServiceProvider =
  { provide: BADGES_REST,
    useFactory: BadgesRestFactory,
    deps: [Restangular]
  };
