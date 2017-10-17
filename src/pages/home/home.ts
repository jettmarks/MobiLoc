import {Component} from "@angular/core";
import {MapComponent} from "../../components/map/map";
import {NavController} from "ionic-angular";
import {locationServiceProvider} from "../../providers/resources/location/location.service.provider";
import {LocationService} from "../../providers/resources/location/location.service";
import {GeoLocComponent} from "../../components/geo-loc/geo-loc";
import {LocationTypeService} from "../../providers/resources/loctype/loctype.service";
import {locationTypeServiceProvider} from "../../providers/resources/loctype/loctype.service.provider";

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
    public navCtrl: NavController,
    public mapComponent: MapComponent,
    public locationService: LocationService,
    public locationTypeService: LocationTypeService,
    private geoLoc: GeoLocComponent,
  ) {
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
  assembleAndAddLocation(location: clueRide.Location) {
    let locationType = this.locationTypeService.getById(location.locationTypeId);
    console.log(location.id + ": " + location.name);
    this.mapComponent.addLocation(location, locationType.icon);
    this.locationMap[location.id] = location;
  }

  ngOnInit(): void {
    /* Sort out how we obtain our positioning. */
    let positionObservable = this.geoLoc.getPositionWatch();

    /* Bringing up the map centered on current location. */
    let disposeMe = positionObservable.subscribe(
      (position) => {
        this.mapComponent.openMap(
          position
        );
        disposeMe.unsubscribe();
        this.loadNearestLocations(position);
      }
    );
  }

  ngOnDestroy(): void {
    this.mapComponent.closeMap();
  }

}
