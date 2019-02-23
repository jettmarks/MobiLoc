import {App, NavController} from "ionic-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Component, Injectable} from "@angular/core";
import {CRMarker} from "../markers/crMarker";
import {isDefined} from "ionic-angular/util/util";
import {MarkersComponent} from "../markers/markers";
import {GeoLocService, LatLon, Location, ObservableGeoposition} from "front-end-common";
import {Geoposition} from "@ionic-native/geolocation";
import {HeadingComponent} from "../heading/heading";
import * as L from "leaflet";
import {LocEditPage} from "../../pages/loc-edit/loc-edit";
import {LatLonComponent} from "../lat-lon/lat-lon";
import {MapDragService} from "src/providers/map-drag/map-drag";
import {MapDataService} from "../../providers/map-data/map-data";
import {Subject} from "../../../../front-end-common/node_modules/rxjs";

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
  showLatLon: boolean = true;
  showCrosshairs: boolean = false;

  /* TODO: Move to a service. */
  public static map: any;
  static locationMap: LocationMap = {};
  private static tethered: boolean = false;
  static latLon: LatLonComponent = <any>{};
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
    public geoLoc: GeoLocService,
    private heading: HeadingComponent,
    private markers: MarkersComponent,
    private mapDragService: MapDragService,
    private mapDataService: MapDataService,
  ) {
    this.zoomLevel = 14;

    console.log("Registering for New Locations");
    this.mapDataService.sendMeNewLocations(this.addLocation);
  }

  /**
   * @ngDoc
   * Prepares the Leaflet map to be shown, initializing leaflet if not already initialized.
   * Source of position info should be settled prior to calling this function.
   */
  public openMap(
    positionSubject: Subject<Geoposition>,
  ) {
    console.log("Open Map");
    positionSubject.asObservable().subscribe(
      (position) => {
        this.openMapAtPosition(position);
      }
    );
  }

  public openMapAtPosition(position: Geoposition) {
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

      /* TODO: Rename this presentation component. */
      MapComponent.latLon = new LatLonComponent();
      MapComponent.latLon.addTo(MapComponent.map);
      MapComponent.latLon.setPositionSubject(MapComponent.reportedPosition);

      /* Attach the reported position subject to the Move Start service. */
      this.mapDragService.useMap(MapComponent.map, MapComponent.reportedPosition);
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
      this.mapDragService.setAutoCenter(false);
    });

    /* Begin paying attention to position changes. */
    this.setWatch();

  }

  public setWatch(): ObservableGeoposition {
    let positionObservable = this.geoLoc.getPositionWatch();
    positionObservable.subscribe(
      (position) => {
        if (!this.mapDragService.isDragInProgress()) {
          this.setNewCenterForMap(position);
        }
      }
    );
    return positionObservable;
  }

  setNewCenterForMap(position: Geoposition) {
    this.heading.updateLocation(position.coords);

    /* Move map so current location is centered. */
    if (this.mapDragService.isAutoCenter() && MapComponent.map) {

      /* Suspend move event generation. */
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

      /* Restore move event generation. */
      MapComponent.map.on('movestart',
        () => {
          this.mapDragService.setAutoCenter(false);
        }
      );
    }
  };

  public closeMap() {
    console.log("Close Map -- turn off watches");
    if (isDefined(MapComponent.map) && MapComponent.map !== null) {
      this.geoLoc.clearWatch();
    }
    this.heading.releaseHeadingMarker();
  }

  /**
   * Given a Location, place it on the map.
   * @param location to be added.
   */
  private addLocation = (
    location: Location
  ): void => {
    let iconName = location.locationTypeIconName;
    MapComponent.locationMap[location.id] = location;
    let locationMarker = this.markers.getLocationMarker(location, iconName)
      .on('click', (mouseEvent) => {
        this.openLocEditPageForMarkerClick(mouseEvent);
      });
    locationMarker.addTo(MapComponent.map);
  };

  /**
   * Given the click event for a location's marker, which contains the location ID,
   * open the Location Edit page with that Location.
   * @param mouseEvent
   */
  private openLocEditPageForMarkerClick = (
    mouseEvent
  ): void => {
    console.log("Marker Click for Loc ID: " + mouseEvent.target.locationId);
    let crMarker: CRMarker = mouseEvent.target;
    let nav = <NavController>this.appCtrl.getRootNavById("n4");
    let loc = MapComponent.locationMap[crMarker.locationId];
    nav.push(
      LocEditPage,
      {
        location: loc,
        tabId: MapComponent.getTabIdForLocation(loc)
      }
    );
  };

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

  settingsFabAction(event) {
    event.srcEvent.stopPropagation();
    console.log("Settings Toggle");
  }

  settingsToggleCrosshairs(event) {
    event.srcEvent.stopPropagation();
    this.showCrosshairs = !this.showCrosshairs;
    console.log("Crosshairs: " + this.showCrosshairs);
  }

  settingsToggleLatLon(event) {
    event.srcEvent.stopPropagation();
    this.showLatLon = !this.showLatLon;
    MapComponent.latLon.enableDisplay(this.showLatLon);
    console.log("Lat/Lon: " + this.showLatLon);
  }

  settingsToggleAutoCenter(event) {
    event.srcEvent.stopPropagation();
    this.mapDragService.setAutoCenter(!this.mapDragService.isAutoCenter());
  }

  /* Respond to request to repaint the locations. */
  refreshMap(event) {
    event.srcEvent.stopPropagation();
    this.openMapAtPosition(this.mapDataService.getCurrentPosition());
    /* Clear existing list of locations. */
    /* Trigger sending us another set of locations. */
    this.mapDataService.resendAllLocations();
  }

  /* Won't be appropriate for Loc Edit. */
  settingsToggleTether() {
    MapComponent.tethered = !MapComponent.tethered;
  }

}
