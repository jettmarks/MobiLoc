import {Inject, Injectable} from "@angular/core";
import {LOCATION_TYPE_REST} from "./loctype.service.provider";
import LocationType = clueRide.LocationType;
/**
 * Created by jett on 7/22/17.
 */

@Injectable()
export class LocationTypeService {

  static locationTypeCache: LocationType[] = [];

  constructor(
    @Inject(LOCATION_TYPE_REST) private resource
  ) {
    /* Although construction does offer opportunity to fill cache,
     * waiting until explicitly invoked improves our control over
     * when the initialization takes place (testing, life-cycle).
     */
  }

  /**
   * Builds cached map of LocationTypeID -> LocationType from resource, but
   * only if we haven't already populated the cache.
   */
  public initializeCache(): void {
    if (LocationTypeService.locationTypeCache.length == 0) {
      this.resource.types({}).subscribe(
        (response) =>  {
          response.forEach(locType => {
            LocationTypeService.locationTypeCache[locType.id] = locType;
          });
        }
      );
    }
  }

  public allLocationTypes(): Array<LocationType> {
    return LocationTypeService.locationTypeCache;
  }

  public getById(id: number): LocationType {
    return LocationTypeService.locationTypeCache[id];
  }

}
