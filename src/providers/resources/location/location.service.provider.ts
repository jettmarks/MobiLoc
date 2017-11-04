import {InjectionToken} from "@angular/core";
import {Resource} from "../resource";
import {Restangular} from "ngx-restangular";

export const LOCATION_REST = new InjectionToken<string>('LocationResource');

/* Resource providing Nearest Location instances suitable for edit. */
const NEAREST =
  {
    resourceName: 'location',
    name: 'nearest',
    httpMethod: 'get',
    path: 'nearest-marker',
    object: {
      lat: 33.4,
      lon: -84.7,
    }
  };

/* For a given locationId, provide a feature set (geometry) for the location. */
const FEATURE =
  {
    resourceName: 'location',
    name: 'feature',
    httpMethod: 'get',
    path: 'map',
    object: { locationId: 1 }
  };

const UPDATE =
  {
    resourceName: 'location',
    name: 'update',
    httpMethod: 'post',
    path: 'update',
  };

export function RestFactory(
  restangular: Restangular,
  crResource: Resource,
) {

  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, NEAREST);
    }
  );

  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, FEATURE);
    }
  );

  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, UPDATE);
    }
  );

  return restangular.service('location');
}

export let locationServiceProvider =
  { provide: LOCATION_REST,
    useFactory: RestFactory,
    deps: [Restangular, Resource]
  };

