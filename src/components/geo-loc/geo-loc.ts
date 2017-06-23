import {Component} from '@angular/core';
import {GeolocationOptions} from '@ionic-native/geolocation';
import {Platform} from "ionic-angular";

/**
 * Generated class for the GeoLocComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'geo-loc',
  templateUrl: 'geo-loc.html'
})
export class GeoLocComponent {

  /** Current Location; shaped as a two-element array [latitude, longitude] in degrees. */
  private latLon: [number, number];

  private readyState: boolean = false;

  /** May want to make this configurable.
   */
  private geoLocOptions: GeolocationOptions = {
    timeout: 10000,
    enableHighAccuracy: true
  };

  public onSuccess(resp) {
    this.latLon = [resp.coords.latitude, resp.coords.longitude];
  }

  public onError(error) {
    console.log('Error getting location', error);
  }

  constructor(
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      console.log('Platform Ready for GeoLocComponent');

      navigator.geolocation.getCurrentPosition(
        (resp) => {
          this.latLon = [resp.coords.latitude, resp.coords.longitude];
        },
        this.onError,
        this.geoLocOptions
      );
    });
  }

  public currentPosition(): [number, number] {
    return this.latLon;
  }

  public isReady() {
    return this.readyState;
  }

  public checkPlatform() {
    this.platform.ready().then(() => {
      this.readyState = true;
      navigator.geolocation.getCurrentPosition(
        this.onSuccess,
        this.onError,
        this.geoLocOptions
      );
    });
  }

  public watchPosition(param: (position) => any) {
    navigator.geolocation.watchPosition(param);
  }
}