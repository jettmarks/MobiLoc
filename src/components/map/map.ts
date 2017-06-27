import { Component } from '@angular/core';
import {GeoLocComponent} from "../geo-loc/geo-loc";
import {isDefined} from "ionic-angular/util/util";

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'cr-map',
  templateUrl: 'map.html'
})
export class MapComponent {
  currentPosition: any;

  /** Holds the current zoom for the map. */
  zoomLevel: number;
  map: any;
  lastPosition: [number, number];

  constructor(
    public geoLoc: GeoLocComponent
  ) {
    console.log('MapComponent Initializing');
    this.zoomLevel = 14;
    this.lastPosition = [33.77, -84.37];
  }

  public showMap() {
    /* If map is already initialized, nothing to do. */
    if (!isDefined(this.map) || this.map === null) {
      this.map = L.map('map');
      // .setView(this.geoLoc.currentPosition(), zoomLevel);
    }

    this.map.setView(
      this.lastPosition,
      this.zoomLevel
    );

    console.log('Setting Watch for current position');
    this.geoLoc.watchPosition((position) => {
      this.zoomLevel = this.map.getZoom();
      this.map.setView([
        position.coords.latitude,
        position.coords.longitude
      ], this.zoomLevel);
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(this.map);
  }

  public closeMap() {
    if (isDefined(this.map) && this.map !== null) {
      this.geoLoc.clearWatch();
      this.map.remove();
    }
    this.map = null;
  }
}
