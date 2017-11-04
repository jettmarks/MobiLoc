import {Restangular} from "ngx-restangular";
import {InjectionToken} from "@angular/core";
import {Resource} from "../resource";

export const LOCATION_TYPE_REST = new InjectionToken<string>('LocationTypeResource');

const TYPES =
  {
    resourceName: 'location',
    name: 'types',
    httpMethod: 'get',
    path: 'types',
  };


function RestFactory(
  restangular: Restangular,
  crResource: Resource,
) {

  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, TYPES);
    }
  );

  return restangular.service('location');
}

export let locationTypeServiceProvider =
  { provide: LOCATION_TYPE_REST,
    useFactory: RestFactory,
    deps: [Restangular, Resource]
  };

