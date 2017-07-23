import {Component} from "@angular/core";
import "leaflet";
import {MapComponent} from "../../components/map/map";
import {NavController} from "ionic-angular";
import {locationServiceProvider} from "../../providers/resources/location/location.service.provider";
import {LocationService} from "../../providers/resources/location/location.service";

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
  map: any;
  locationList: Location[] = [];

  constructor(
    public navCtrl: NavController,
    public mapComponent: MapComponent,
    public locationService: LocationService,
  ) {

  }

  ngOnInit(): void {
    /* Bringing up the map centered on current location. */
    this.mapComponent.openMap();

    /* Retrieving nearest locations. */
    this.locationList = this.locationService.nearest({
      lat: 33.775,
      lon: -84.365
    });

  }

  ngOnDestroy(): void {
    this.mapComponent.closeMap();
  }

}
