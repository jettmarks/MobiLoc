import {Injectable} from '@angular/core';
import {Geoposition} from "@ionic-native/geolocation";
import {Location} from "../resources/location/location";
import {LocationService} from "../resources/location/location.service";
import {LocationTypeService} from "../resources/loctype/loctype.service";
import {MapComponent} from "../../components/map/map";

/**
 * Maintains the life-cycle for all Map data -- leaflet and the
 * Locations we place on the map.
 */
@Injectable()
export class MapDataService {

  locationMap = {};

  constructor(
    public locationService: LocationService,
    public locationTypeService: LocationTypeService,
    private mapComponent: MapComponent,
) {
    console.log('Hello MapDataService Provider');
  }

  public postInitialPosition(position: Geoposition): void {
    this.loadNearestLocations(position);
    console.log("4. Proceeding with Map initialization");
    this.mapComponent.openMap(position);
  }

  initializeCaches(): void {
    this.locationTypeService.initializeCache();
    /* Other caches here? */
  }

  /**
   * Given a position, retrieve the locations nearest that position.
   * @param position
   */
  loadNearestLocations(position) {
    this.locationService.nearest({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }).subscribe(
      (locations) => {
        this.locationMap = {};
        locations.forEach(
          (location) => {
            this.assembleAndAddLocation(location);
          }
        );
      }
    )
  }

  /**
   * There are multiple pieces of data that build up a Location; this puts
   * them all together.
   * @param location
   */
  assembleAndAddLocation(location: Location) {
    let locationType = this.locationTypeService.getById(location.locationTypeId);
    console.log(location.id + ": " + location.name);
    this.mapComponent.addLocation(location, locationType.icon);
    this.locationMap[location.id] = location;
  }

}
