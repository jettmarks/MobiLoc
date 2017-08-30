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

      configurer.addFullRequestInterceptor(
        (element, operation, path, url, headers, params) => {
          let bearerToken = creds.getBearerToken();

          return {
            headers: Object.assign({}, headers, {Authorization: `Bearer ${bearerToken}`})
          };
        }
      );

      /* Resource providing Nearest Location instances suitable for edit. */
      configurer.addElementTransformer('location', true,
        (resource) => {
          resource.addRestangularMethod(
            'nearest',
            'get',
            'nearest-marker',
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

  restangular.withConfig(
    (configurer) => {

      configurer.addFullRequestInterceptor(
        (element, operation, path, url, headers, params) => {
          let bearerToken = creds.getBearerToken();

          return {
            headers: Object.assign({}, headers, {Authorization: `Bearer ${bearerToken}`})
          };
        }
      );

      /* For a given locationId, provide a feature set (geometry) for the location. */
      configurer.addElementTransformer('location', true,
        (resource) => {
          resource.addRestangularMethod(
            'feature',
            'get',
            'map',
            { locationId: 1 }
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

