import {SessionTokenService} from "../../session-token/session-token.service";
import {InjectionToken} from "@angular/core";
import {Restangular} from "ngx-restangular/dist/esm/src";

export const BADGES_REST = new InjectionToken<string>('BadgeResource');

function RestFactory(
  restangular: Restangular,
  sessionTokenService: SessionTokenService,
) {
  /* Configure this particular resource to capture the Authorization header. */
  restangular.withConfig(
    (configurer) => {

      configurer.addResponseInterceptor(
        (data, operation, what, url, response) => {
          /* Check if we should pick up this token to use in subsequent requests. */
          if (response.headers.get('Authorization')) {
            let token = response.headers.get('Authorization').split(" ")[1];
            sessionTokenService.setAuthToken(token);
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
    useFactory: RestFactory,
    deps: [Restangular,SessionTokenService]
  };
