import {Inject, Injectable} from "@angular/core";
import {LOCATION_REST} from "./location.service.provider";
/**
 * Created by jett on 7/22/17.
 */

@Injectable()
export class LocationService {

  constructor(
    @Inject(LOCATION_REST) private resource
  ) {
  }

  feature(params: any) {
    return this.resource.feature(params);
  }

  nearest(params: any) {
    return this.resource.nearest(params);
  }

  update(params: any) {
    return this.resource.update(params);
  }

  types(params: any) {
    return this.resource.types(params);
  }

}
