import {Creds} from "../../creds/creds.service";
import {Restangular} from "ngx-restangular/dist/esm/src";
import {OpaqueToken} from "@angular/core";

export const LOCATION_REST = new OpaqueToken('LocationResource');

function RestFactory(
  restangular: Restangular,
  creds: Creds,
) {
  restangular.withConfig(
    (configurer) => {

      configurer.addRequestInterceptor(
        (element, operation, path, url, headers, params) => {
          let bearerToken = creds.getBearerToken();

          return {
            headers: Object.assign({}, headers, {Authorization: `Bearer ${bearerToken}`})
          };
        }
      );

      configurer.addElementTransformer('location', true,
        (resource) => {
          resource.addRestangularMethod(
            'nearest',
            'get',
            'nearest',
            {
              lat: 33.4,
              lon: -84.7,
            }
          );
          return resource;
        }
      );
    }
  );
  return restangular.service('location');
}

export let locationServiceProvider =
  { provide: LOCATION_REST,
    useFactory: RestFactory,
    deps: [Restangular,Creds]
  };

