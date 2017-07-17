import {Component, Injectable} from "@angular/core";
import {GeoLocComponent} from "../geo-loc/geo-loc";
import {isDefined} from "ionic-angular/util/util";
import {MarkersComponent} from "../markers/markers";
import {SplashScreen} from "@ionic-native/splash-screen";
import LatLngExpression = L.LatLngExpression;

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Injectable()
@Component({
  selector: 'cr-map',
  templateUrl: 'map.html'
})
export class MapComponent {

  /** Holds the current zoom for the map. */
  zoomLevel: number;
  map: any;
  lastPosition: [number, number];
  private autoCenter: boolean = false;

  constructor(
    public geoLoc: GeoLocComponent,
    private markers: MarkersComponent,
    public splashScreen: SplashScreen
  ) {
    this.zoomLevel = 14;
    this.lastPosition = [33.77, -84.37];
  }

  public setWatch() {
    console.log('Setting Watch for current position');
    this.geoLoc.watchPosition((position) => {

      this.markers.updateCurrentLocationMarker(position.coords);

      /* Save for later. */
      this.lastPosition = [
        position.coords.latitude,
        position.coords.longitude
      ];

      /* Move map so current location is centered. */
      if (this.autoCenter) {
        this.map.panTo(this.lastPosition);
      }
    });
  }

  /**
   * @ngDoc
   * Prepares the Leaflet map to be shown, initializing leaflet if not already initialized.
   */
  public openMap() {
    /* If map is already initialized, no need to re-initialize. */
    if (!this.map) {
      console.log('MapComponent Initializing');
      this.map = L.map('map');
    }

    /* Read current position and center the map there to start. */
    this.geoLoc.prepareCenteredMap(
      (position: LatLngExpression) => {
        this.map.setView(
          position,
          this.zoomLevel
        );

        /* Map is ready; turn off splash screen. */
        this.splashScreen.hide();
      }
    );


    /* Specify the tile layer for the map and add the attribution. */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(this.map);

    /* Add a "here I am" marker. */
    this.markers.getHereIAmMarker(this.lastPosition).addTo(this.map);

    /* Set map to update when position changes. */
    this.setWatch();

  }

  public closeMap() {
    if (isDefined(this.map) && this.map !== null) {
      this.geoLoc.clearWatch();
      this.map.remove();
    }
    this.map = null;
  }
}
