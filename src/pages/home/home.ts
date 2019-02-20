import {Component} from "@angular/core";
import {MapComponent} from "../../components/map/map";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public mapComponent: MapComponent,
  ) {
  }
  ngOnInit(): void {
    // this.mapComponent.openMap();
  }

  ngOnDestroy(): void {
    this.mapComponent.closeMap();
  }

}
