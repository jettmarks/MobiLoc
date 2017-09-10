import {Component} from "@angular/core";
import {GeoLocComponent} from "../geo-loc/geo-loc";
import * as L from "leaflet";

/**
 * Generated class for the LatLonComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'lat-lon',
  templateUrl: 'lat-lon.html'
})
export class LatLonComponent extends L.Control {
  state: boolean = true;
  public coords: any = {};

  public onAdd (map) {
    return L.DomUtil.create('div', 'lat-lon-component');
  }

  public setContent(onOff) {
    if (onOff) {
      let point = [
        this.coords.latitude,
        this.coords.longitude
      ];
      this.getContainer().innerHTML = "LatLon: " + point;
    } else {
      this.getContainer().innerHTML = " ";
    }
  }

  constructor(
    geoLoc: GeoLocComponent
  ) {
    super();
    this.options.position = 'bottomleft';

    geoLoc.getPositionWatch().subscribe(
      (position) => {
        this.coords = position.coords;
        this.setContent(this.state);
      }
    );
    console.log('Hello LatLonComponent Component');
  }

}
