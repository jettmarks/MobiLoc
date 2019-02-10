import {Component, Injectable} from "@angular/core";
import {isDefined} from "ionic-angular/util/util";
import {MarkersComponent} from "../markers/markers";
import {SplashScreen} from "@ionic-native/splash-screen";
import {AuthService, GeoLocService, LatLon, ObservableGeoposition} from "front-end-common";
import {Geoposition} from "@ionic-native/geolocation";
import * as L from "leaflet";
import {CRMarker} from "../markers/crMarker";
import {Location} from "../../providers/resources/location/location";
import {LocEditPage} from "../../pages/loc-edit/loc-edit";
import {App} from "ionic-angular";
import {LatLonComponent} from "../lat-lon/lat-lon";
import {HeadingComponent} from "../heading/heading";
import {MapMoveService} from "../../providers/map-move/map-move";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

interface LocationMap {
  [index: number]: Location;
}

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
  public static map: any;
  static locationMap: LocationMap = {};
  showLatLon: boolean = true;
  showCrosshairs: boolean = false;
  static latLon: LatLonComponent = <any>{};
  private static tethered: boolean = false;
  private static reportedPosition: BehaviorSubject<Geoposition> = new BehaviorSubject({
    coords: {
      latitude: 33.75,
      longitude: -84.75,
      accuracy: 0.0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    },
    timestamp: null
  });
  public publiclyReportedPosition: BehaviorSubject<Geoposition> = MapComponent.reportedPosition;

  constructor(
    public appCtrl: App,
    private authService: AuthService,
    public geoLoc: GeoLocService,
    private heading: HeadingComponent,
    private markers: MarkersComponent,
    private moveStart: MapMoveService,
    public splashScreen: SplashScreen,
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
    /* Assemble Leaflet position object. (LE-70) */
    let leafletPosition = [
      position.coords.latitude,
      position.coords.longitude
    ];

    /* If map is already initialized, no need to re-initialize. */
    if (!MapComponent.map) {
      console.log('MapComponent Initializing');
      MapComponent.locationMap = {};
      MapComponent.map = L.map('map');
      MapComponent.map.setView(leafletPosition, this.zoomLevel);
      MapComponent.latLon = new LatLonComponent();
      MapComponent.latLon.addTo(MapComponent.map);
      MapComponent.latLon.setPositionSubject(MapComponent.reportedPosition);

      /* Attach the reported position subject to the Move Start service. */
      this.moveStart.useMap(MapComponent.map, MapComponent.reportedPosition);
    }


    /* Specify the tile layer for the map and add the attribution. */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(MapComponent.map);

    /* Add a "here I am" marker. */
    this.heading.getHeadingMarker().addTo(MapComponent.map);

    /* Turn off auto-center if user drags the map. */
    MapComponent.map.on('movestart', () => {
      this.moveStart.setAutoCenter(false);
    });

    /* Begin paying attention to position changes. */
    this.setWatch();

    if (!this.authService.runningLocal()) {
      /* Map is ready; turn off splash screen. */
      this.splashScreen.hide();
    }

  }

  public setWatch(): ObservableGeoposition {
    let positionObservable = this.geoLoc.getPositionWatch();
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
    if (this.moveStart.isAutoCenter() && MapComponent.map) {
      /* Suspend move event generation */
      MapComponent.map.off('movestart');
      // TODO: LE-70 Prepare a better pattern for converting between these two representations.
      let latLon: LatLon = {
        id: 0,
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        lng: position.coords.longitude
      };
      MapComponent.map.panTo(latLon);
      console.log("Map.updatePosition: next Reported Position");
      MapComponent.reportedPosition.next(position);
      MapComponent.map.on('movestart',
        () => {
          this.moveStart.setAutoCenter(false);
        }
      );
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
    location: Location,
    iconName: string
  ) {
    MapComponent.locationMap[location.id] = location;
    let locationMarker = this.markers.getLocationMarker(location, iconName)
      .on('click', (mouseEvent) => {
        console.log("Mouse Event: " + mouseEvent);
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
   * @param {Location} loc instance carrying a readinessLevel.
   * @returns {number} representing an offset from Draft.
   */
  private static getTabIdForLocation(loc: Location) {
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
    MapComponent.latLon.enableDisplay(this.showLatLon);
    console.log("Lat/Lon: " + this.showLatLon);
  }

  settingsToggleAutoCenter() {
    this.moveStart.setAutoCenter(!this.moveStart.isAutoCenter());
  }

  settingsToggleTether() {
    MapComponent.tethered = !MapComponent.tethered;
  }

}
