import {Component, ViewChild} from "@angular/core";
import {IonicPage} from "ionic-angular";
import {MapComponent} from "../../components/map/map";
import {MapDataService} from "../../providers/map-data/map-data";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(MapComponent) map: MapComponent;

  constructor(
    private mapDataService: MapDataService,
  ) {
  }

  /**
   * Life-Cycle events are tracked at the View level.
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad Home/Map Page');
  }

  ionViewWillEnter() {
    console.log("Map/Home Page: Will Enter");
    this.map.openMap(this.mapDataService.getCurrentPositionSubject());
  }

  /**
   * Life-Cycle events are tracked at the View level.
   */
  ionViewWillLeave() {
    console.log("Map/Home Page: Will Leave");
    this.map.closeMap();
  }

}
