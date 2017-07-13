import {Component} from "@angular/core";
import "leaflet";
import {MapComponent} from "../../components/map/map";
import {NavController} from "ionic-angular";
import {LocationResource} from "../../providers/resources/location/location.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /** Instance of a Leaflet Map. */
  map: any;

  locationList: Location[] = [];

  constructor(
    public navCtrl: NavController,
    public mapComponent: MapComponent,
    public locationResource: LocationResource
  ) {

  }

  ngOnInit(): void {
    /* Bringing up the map centered on current location. */
    this.mapComponent.openMap();

    /* Retrieving nearest locations. */
    this.locationList = this.locationResource.nearest({
      lat: 33.775,
      lon: -84.365
    });
  }

  ngOnDestroy(): void {
    this.mapComponent.closeMap();
  }

}
