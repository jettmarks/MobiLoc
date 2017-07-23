import {Restangular} from "ngx-restangular/dist/esm/src";
import {OpaqueToken} from "@angular/core";

export const BADGES_REST = new OpaqueToken('BadgeResource');

export function BadgesRestFactory(restangular: Restangular) {
  return restangular.service('login');
}

export let badgeServiceProvider =
  { provide: BADGES_REST,
    useFactory: BadgesRestFactory,
    deps: [Restangular]
  };
