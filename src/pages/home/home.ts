import {Component} from "@angular/core";
import {MapComponent} from "../../components/map/map";
import {NavController} from "ionic-angular";
import {locationServiceProvider} from "../../providers/resources/location/location.service.provider";
import {LocationService} from "../../providers/resources/location/location.service";
import {GeoLocComponent} from "../../components/geo-loc/geo-loc";
import {Subject} from "rxjs/Subject";
import {CRMarker} from "../../components/markers/crMarker";
import {LocEditPage} from "../loc-edit/loc-edit";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    locationServiceProvider,
    LocationService
  ],
})
export class HomePage {

  locationMap = {};
  markerEventSubject: Subject<CRMarker>;

  constructor(
    public navCtrl: NavController,
    public mapComponent: MapComponent,
    public locationService: LocationService,
    private geoLoc: GeoLocComponent,
  ) {
    this.markerEventSubject = new Subject();
  }

  ngOnInit(): void {
    /* Sort out how we obtain our positioning. */
    let positionObservable = this.geoLoc.getPositionWatch();

    /* Bringing up the map centered on current location. */
    let disposeMe = positionObservable.subscribe(
      (position) => {
        this.mapComponent.openMap(
          position,
          this.markerEventSubject,
        );
        disposeMe.unsubscribe();

        /* Retrieving nearest locations. */
        this.locationService.nearest({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }).subscribe(
          (locations) => {
            this.locationMap = {};
            locations.forEach(
              (location, key) => {
                console.log(key + ": " + location.name);
                this.mapComponent.addLocation(location);
                this.locationMap[location.id] = location;
              }
            );
          }
        );
      }
    );

    /* Setup response to Marker Events. */
    this.markerEventSubject.asObservable().subscribe(
      (crMarker: CRMarker) => {
        let locId = crMarker.locationId;
        let loc = this.locationMap[locId];
        let tabId = this.getTabIdForLocation(loc);

        this.navCtrl.push(LocEditPage, {
          location: loc,
          tabId: tabId
        });
      }
    );

  }

  private getTabIdForLocation(loc: clueRide.Location) {
    switch(loc.readinessLevel) {
      case 'FEATURED':
        return 2;
      case 'ATTRACTION':
        return 1;
      default:
        return 0;
    }
  }

  ngOnDestroy(): void {
    this.mapComponent.closeMap();
  }

}
