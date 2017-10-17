import {Component} from "@angular/core";
import {IonicPage, NavParams} from "ionic-angular";
import {LocationService} from "../../providers/resources/location/location.service";
import {locationServiceProvider} from "../../providers/resources/location/location.service.provider";
import {LocationTypeService} from "../../providers/resources/loctype/loctype.service";
import {locationTypeServiceProvider} from "../../providers/resources/loctype/loctype.service.provider";

/**
 * Generated class for the LocEditPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-loc-edit',
  templateUrl: 'loc-edit.html',
  providers: [
    LocationService,
    locationServiceProvider,
    LocationTypeService,
    locationTypeServiceProvider,
  ]
})
@IonicPage()
export class LocEditPage {

  editSegment: string;
  location: clueRide.Location;
  private editSegments = [
    'draft',
    'attraction',
    'featured'
  ];

  locTypes = [];

  constructor(
    public navParams: NavParams,
    private locationService: LocationService,
    private locationTypeService: LocationTypeService,
  ) {
    this.editSegment = this.editSegments[navParams.get("tabId")];
    this.location = navParams.get("location");

    this.locationTypeService.allLocationTypes({}).subscribe(
      (locationTypes) => {
        locationTypes.forEach(
          (locationType, key) => {
            this.locTypes.push(
              {
                value: locationType.id,
                text: locationType.name
              }
            );
          }
        );
      }
    );
  }

  //noinspection JSMethodCanBeStatic
  /**
   * Invoked when the user is ready to persist changes.
   */
  save() {
    console.log("Saving");
    this.locationService.update(this.location);
  }

}
