import {Inject, Injectable} from "@angular/core";
import {LOCATION_TYPE_REST} from "./loctype.service.provider";
import LocationType = clueRide.LocationType;
/**
 * Created by jett on 7/22/17.
 */

@Injectable()
export class LocationTypeService {

  static locationTypes: LocationType[];

  constructor(
    @Inject(LOCATION_TYPE_REST) private resource
  ) {
    LocationTypeService.locationTypes = [];
    this.fillCache().then(
      (locationTypes) =>  {
        locationTypes.forEach(locType => {
          LocationTypeService.locationTypes[locType.id] = locType;
        });
      }
    );
  }

  public allLocationTypes(params: any) {
    return this.resource.types(params);
  }

  private async fillCache(): Promise<any> {
    return await this.allLocationTypes({}).first().toPromise();
  }

  getById(id: number): LocationType {
    return LocationTypeService.locationTypes[id];
  }

}
