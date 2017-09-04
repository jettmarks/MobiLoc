import {Component} from "@angular/core";
import "leaflet";
import {MapComponent} from "../../components/map/map";
import {NavController} from "ionic-angular";
import {locationServiceProvider} from "../../providers/resources/location/location.service.provider";
import {LocationService} from "../../providers/resources/location/location.service";
import {GeoLocComponent} from "../../components/geo-loc/geo-loc";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    locationServiceProvider,
    LocationService
  ],
})
export class HomePage {

  /** Instance of a Leaflet Map. */
  locationList: Location[] = [];

  constructor(
    public navCtrl: NavController,
    public mapComponent: MapComponent,
    public locationService: LocationService,
    private geoLoc: GeoLocComponent,
  ) {

  }

  ngOnInit(): void {
    /* Sort out how we obtain our positioning. */
    let positionObservable = this.geoLoc.getPositionWatch();

    /* Bringing up the map centered on current location. */
    let disposeMe = positionObservable.subscribe(
      (position) => {
        this.mapComponent.openMap(position);
        disposeMe.unsubscribe();

        /* Retrieving nearest locations. */
        this.locationService.nearest({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }).subscribe(
          (locations) => {
            locations.forEach(
              (value, key) => {
                console.log(key + ": " + value.name);
                this.mapComponent.addLocation(value);
              }
            );
          }
        );
      }
    );

  }

  ngOnDestroy(): void {
    this.mapComponent.closeMap();
  }

}
