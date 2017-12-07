import {Component} from "@angular/core";
import * as L from "leaflet";
import {Geoposition} from "@ionic-native/geolocation";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";
import {isDefined} from "ionic-angular/util/util";

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
  private displayEnabledFlag: boolean = true;

  /* Fed by either the map center or GPS position */
  positionObservable: Observable<Geoposition>;
  positionSubscription: Subscription;

  constructor(
  ) {
    super();
    this.options.position = 'bottomleft';
  }

  public onAdd(map) {
    return L.DomUtil.create('div', 'lat-lon-component');
  }

  public enableDisplay(showLatLon: boolean) {
    this.displayEnabledFlag = showLatLon;
  }

  public setPositionSubject(subject: Subject<Geoposition>): Subscription {
    this.positionObservable = subject.asObservable();
    return this.watchPosition();
  }

  private watchPosition(): Subscription {
    this.positionSubscription = this.positionObservable.subscribe(
      (position) => {
        this.setContent(position);
      }
    );
    return this.positionSubscription;
  }

  private setContent(position: Geoposition) {
    let coords = position.coords;
    if (this.displayEnabledFlag && coords && isDefined(coords.latitude)) {
      let point = [
        coords.latitude.toFixed(6),
        coords.longitude.toFixed(6)
      ];
      this.getContainer().innerHTML = "LatLon: " + point;
    } else {
      this.getContainer().innerHTML = " ";
    }
  }

}
