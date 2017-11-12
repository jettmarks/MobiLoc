import {Component, Injectable} from "@angular/core";
import {GeoLocComponent} from "../geo-loc/geo-loc";
import {isDefined} from "ionic-angular/util/util";
import {MarkersComponent} from "../markers/markers";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Geoposition} from "@ionic-native/geolocation";
import * as L from "leaflet";
import {CRMarker} from "../markers/crMarker";
import {LocEditPage} from "../../pages/loc-edit/loc-edit";
import {App} from "ionic-angular";
import {LatLonComponent} from "../lat-lon/lat-lon";
import {HeadingComponent} from "../heading/heading";
import {Observable} from "rxjs/Observable";

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
  static map: any;
  private autoCenter: boolean = false;
  static locationMap = {};
  showLatLon: boolean = true;
  showCrosshairs: boolean = false;
  static latLon: LatLonComponent;

  constructor(
    public geoLoc: GeoLocComponent,
    private markers: MarkersComponent,
    private heading: HeadingComponent,
    public splashScreen: SplashScreen,
    public appCtrl: App
  ) {
    this.zoomLevel = 14;
  }

  /**
   * @ngDoc
   * Prepares the Leaflet map to be shown, initializing leaflet if not already initialized.
   * Source of position info should be settled prior to calling this function.
   */
  public openMap(
    position: Geoposition,
  ) {
    /* If map is already initialized, no need to re-initialize. */
    if (!MapComponent.map) {
      console.log('MapComponent Initializing');
      MapComponent.locationMap = {};
      MapComponent.map = L.map('map');
      MapComponent.latLon = new LatLonComponent(this.geoLoc);
      MapComponent.latLon.addTo(MapComponent.map);
      MapComponent.latLon.setContent(this.showLatLon);
    }

    /* Assemble Leaflet position object. */
    let leafletPosition = [
      position.coords.latitude,
      position.coords.longitude
    ];

    MapComponent.map.setView(leafletPosition, this.zoomLevel);

    /* Specify the tile layer for the map and add the attribution. */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(MapComponent.map);

    /* Set map to update when position changes. */
    let positionObservable: Observable<Geoposition> = this.setWatch();

    /* Add a "here I am" marker. */
    this.heading.getHeadingMarker(positionObservable).addTo(MapComponent.map);

    /* Map is ready; turn off splash screen. */
    this.splashScreen.hide();

  }

  public setWatch():Observable<Geoposition> {
    let positionObservable =  this.geoLoc.getPositionWatch();
    positionObservable.subscribe(
      (position) => {
        this.updatePosition(position);
      }
    );
    return positionObservable;
  }

  updatePosition(position: Geoposition) {
    this.heading.updateLocation(position.coords);

    /* Move map so current location is centered. */
    if (this.autoCenter) {
      MapComponent.map.panTo(position.coords);
    }
  };

  public closeMap() {
    if (isDefined(MapComponent.map) && MapComponent.map !== null) {
      this.geoLoc.clearWatch();
      MapComponent.map.remove();
    }
    MapComponent.map = null;
    this.heading.releaseHeadingMarker();
  }

  /**
   * Given a Location, place it on the map.
   * @param location to be added.
   * @param iconName string name of the icon to represent the location (based on location type).
   */
  public addLocation(
    location: clueRide.Location,
    iconName: string
  ) {
    MapComponent.locationMap[location.id] = location;
    let locationMarker = this.markers.getLocationMarker(location, iconName)
      .on('click', (mouseEvent) => {
        console.log(mouseEvent);
        let crMarker: CRMarker = <any> mouseEvent.target;
        let locId = crMarker.locationId;
        let loc = MapComponent.locationMap[locId];
        let tabId = MapComponent.getTabIdForLocation(loc);

        this.appCtrl.getRootNav().push(LocEditPage, {
          location: loc,
          tabId: tabId
        });
        return null;
      });
    locationMarker.addTo(MapComponent.map);
  }

  /**
   * Reads the Location's readiness level to determine which tab to show.
   * @param {clueRide.Location} loc instance carrying a readinessLevel.
   * @returns {number} representing an offset from Draft.
   */
  private static getTabIdForLocation(loc: clueRide.Location) {
    switch(loc.readinessLevel) {
      case 'FEATURED':
        return 2;
      case 'ATTRACTION':
        return 1;
      default:
        return 0;
    }
  }

  settingsFabAction() {
    console.log("Settings Toggle");
  }

  settingsToggleCrosshairs() {
    this.showCrosshairs = !this.showCrosshairs;
    console.log("Crosshairs: " + this.showCrosshairs);
  }

  settingsToggleLatLon() {
    this.showLatLon = !this.showLatLon;
    MapComponent.latLon.setContent(this.showLatLon);
    console.log("Lat/Lon: " + this.showLatLon);
  }

  /**
   * Responds to FAB button to add a new location.
   */
  addFabAction() {
    console.log(MapComponent.map.getCenter());
  }

}
