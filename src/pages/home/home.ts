import {Component} from "@angular/core";
import "leaflet";
import {MapComponent} from "../../components/map/map";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /** Instance of a Leaflet Map. */
  map: any;

  constructor(
    public navCtrl: NavController,
    public mapComponent: MapComponent
  ) {

  }

  ngOnInit(): void {
    /* Bringing up the map centered on current location. */
    this.mapComponent.openMap();
  }

  ngOnDestroy(): void {
    this.mapComponent.closeMap();
  }

}
