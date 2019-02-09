/**
 * Created by jett on 12/5/17.
 */
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Geoposition} from "@ionic-native/geolocation";
import {LatLon} from "front-end-common";

function buildGeoPositionFromLatLon(latLon: LatLon): Geoposition {
  return {
    coords: {
      latitude: latLon.lat,
      longitude: latLon.lng || latLon.lon,
      accuracy: 0.0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    },
    timestamp: null
  };
}

@Injectable()
export class MoveStartService {

  private autoCenterFlag: boolean = true;
  private mapInstance: any;

  constructor (
  ) {
  }

  public isAutoCenter():boolean {
    return this.autoCenterFlag;
  }

  setAutoCenter(autoCenter: boolean) {
    console.log("AutoCenter set to " + autoCenter);
    this.autoCenterFlag = autoCenter;
  }

  useMap(
    map: any,
    centerSubject: Subject<Geoposition>
  ) {
    this.mapInstance = map;
    map.on("movestart", () => {
      this.setAutoCenter(false);
    });
    map.on("moveend", () => {
      if (!this.isAutoCenter()) {
        // TODO: Refactoring of this function:
        centerSubject.next(
          buildGeoPositionFromLatLon(
            map.getCenter()
          )
        );
      }
    });
    centerSubject.next(
      buildGeoPositionFromLatLon(
        map.getCenter()
      )
    );
  }

}
