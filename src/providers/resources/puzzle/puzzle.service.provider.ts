import {InjectionToken} from "@angular/core";
import {Resource} from "../resource";
import {Restangular} from "ngx-restangular";
/**
 * Created by jett on 10/24/17.
 */

export const PUZZLE_REST = new InjectionToken<string>('PuzzleResource');

/* Resource providing list of Puzzles for a given Location (by ID). */
const BY_LOCATION =
  {
    resourceName: 'puzzle',
    name: 'byLocation',
    httpMethod: 'get',
    path: 'location',
  };

function RestFactory (
  restangular: Restangular,
  crResource: Resource,
) {

  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, BY_LOCATION);
    }
  );

  return restangular.service('puzzle');
}

export let puzzleServiceProvider =
  { provide: PUZZLE_REST,
    useFactory: RestFactory,
    deps: [Restangular, Resource]
  };
