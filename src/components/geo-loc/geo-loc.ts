import {Component} from "@angular/core";
import {GeolocationOptions, Geoposition} from "@ionic-native/geolocation";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

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

  /** The observable we use to update the client. */
  private positionSubject: Subject<Geoposition>;

  /** A Subject for Tethered Position; only instantiated if needed. */
  private tetheredPosition: Subject<Geoposition>;

  /** Type of Position Observable this component provides. */
  private positionType: string = undefined;

  private defaultGeoposition: Geoposition = {
    coords: {
      latitude: 33.77,
      longitude: -84.37,
      accuracy: 0.0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    },
    timestamp: null
  };

  /** May want to make this configurable.
   */
  private geoLocOptions: GeolocationOptions = {
    timeout: 10000,
    enableHighAccuracy: true
  };
  /* Tracks which watch we're paying attention to. */
  private watchId: number;

  constructor(
  ) {
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
    this.positionSubject = undefined;
  }

  getTetheredPosition(): Observable<Geoposition> {
    this.tetheredPosition = new Subject();
    this.tetheredPosition.next(this.defaultGeoposition);
    this.positionType = "Tethered";
    return this.tetheredPosition.asObservable();
  }

  /**
   * Returns an observable that gives the current position when updated.
   * This will be sourced by one of two things:
   * <ul>
   *     <li>Observable against the native location of the device this is running on, or if it fails,
   *     <li>A tethered value that comes from the server for the user's session, or if it fails, a fake value.
   * </ul>
   */
  getPositionWatch(): Observable<Geoposition> {
    if (this.positionSubject) {
      console.log("Reusing existing position watch: " + this.positionType);
    }
    else {
      console.log("2. Determining position sources");
      this.positionSubject = new Subject;
      /* Steer the logic based on whether we obtain device location. */
      navigator.geolocation.getCurrentPosition(

        /* A good response means we can use GPS. */
        (response) => {
          console.log("3. Can retrieve position");
          this.positionType = "Device";
          /* Send this recent position ... */
          this.positionSubject.next(response);
          /* ... and setup watch to continue updating. */
          this.watchId = navigator.geolocation.watchPosition(
            (response) => {
              this.positionSubject.next(response);
            }
          );
        },

        /* Error response means we try tethered. */
        (error) => {
          console.log(error);
          console.log("3. Use Tether instead");
          this.getTetheredPosition().subscribe(
            (response) => {
              this.positionSubject.next(response);
            }
          );
          /* TODO: temp until this is service-backed. */
          this.tetheredPosition.next(this.defaultGeoposition);
        },

        this.geoLocOptions
      );
    }
    return this.positionSubject.asObservable();
  }
}
