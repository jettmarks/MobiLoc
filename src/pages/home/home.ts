import {Component} from "@angular/core";
import {GeoLocService} from "front-end-common";
import {Geoposition} from "@ionic-native/geolocation";
import {locationServiceProvider} from "../../providers/resources/location/location.service.provider";
import {Location} from "../../providers/resources/location/location";
import {LocationService} from "../../providers/resources/location/location.service";
import {LocationTypeService} from "../../providers/resources/loctype/loctype.service";
import {locationTypeServiceProvider} from "../../providers/resources/loctype/loctype.service.provider";
import {MapComponent} from "../../components/map/map";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    locationServiceProvider,
    locationTypeServiceProvider,
    LocationService,
    LocationTypeService
  ],
})
export class HomePage {

  locationMap = {};

  constructor(
    public mapComponent: MapComponent,
    public locationService: LocationService,
    public locationTypeService: LocationTypeService,
    private geoLoc: GeoLocService,
  ) {
  }

  ngOnInit(): void {
    this.awaitAppInitialization();
  }

  /**
   * Sequences a number of components and services needed prior to
   * displaying the map page.
   */
  awaitAppInitialization(): void {
    this.initializeCaches();
    /* Setup the positioning and map once we find out we have GPS available. */
    this.geoLoc.notifyWhenReady().subscribe(
      (response) => {
        console.log("4. Proceeding with Map initialization");
        this.initializePositionSource(response);
      }
    );
  }

  private initializePositionSource(position: Geoposition): void {
    this.mapComponent.openMap(
      position
    );
    this.loadNearestLocations(position);
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

  ngOnDestroy(): void {
    this.mapComponent.closeMap();
  }

  initializeCaches(): void {
    this.locationTypeService.initializeCache();
  }

}
