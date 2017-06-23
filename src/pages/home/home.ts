import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'leaflet';
import {GeoLocComponent} from "../../components/geo-loc/geo-loc";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public geoLoc: GeoLocComponent
  ) {

  }

  /**
   * Bringing up the map centered on current location.
   */
  ngOnInit(): void {
    let zoomLevel = 14,
      map = L.map('map');
      // .setView(this.geoLoc.currentPosition(), zoomLevel);

    this.geoLoc.watchPosition((position) => {
      zoomLevel = map.getZoom();
      map.setView([
        position.coords.latitude,
        position.coords.longitude
      ], zoomLevel);
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
         '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(map);

  }

}
