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
  /* Tracks which watch we're paying attention to. */
  private watchId: number;

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

  /**
   * Sets up a callback function (passed as a parameter) to be called whenever the position changes.
   * @param callbackFunction is called when the position is ready to be updated.
   */
  public watchPosition(callbackFunction: (position) => any) {
    this.watchId = navigator.geolocation.watchPosition(callbackFunction);
  }

  public clearWatch() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  public prepareCenteredMap(callbackFunction: (position: L.LatLngExpression) => any) {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        console.dir(response);
        callbackFunction([
          response.coords.latitude,
          response.coords.longitude,
        ])
      },
      this.onError,
      this.geoLocOptions
    )
  }

}
