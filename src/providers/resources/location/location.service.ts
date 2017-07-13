import {Injectable} from "@angular/core";
import {Resource, ResourceAction, ResourceMethod, ResourceParams} from "ngx-resource";

/**
 * Service for REST API against Locations.
 */
@Injectable()
@ResourceParams({
  url: 'https://player.clueride.com/rest/location'
})
export class LocationResource extends Resource {

  /* Retrieve the Locations nearest to the given point. */
  @ResourceAction({
    isArray: true,
    path: '/nearest?lat={!lat}&lon={!lon}'
  })
  nearest: ResourceMethod<{lat: number, lon: number}, Location[]>;

}
