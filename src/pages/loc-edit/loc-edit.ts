import {Component} from "@angular/core";
import {IonicPage, NavParams} from "ionic-angular";
import {LocationService} from "../../providers/resources/location/location.service";
import {locationServiceProvider} from "../../providers/resources/location/location.service.provider";

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
    locationServiceProvider,
    LocationService
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

  /* TODO: LE-44: Retrieve these values from the back-end. */
  locTypes = [
    {
      value: 'PICNIC',
      text: 'Picnic'
    },
    {
      value: 'TINY_DOOR',
      text: 'Tiny Door',
    },
    {
      value: 'ART_SCULPTURE',
      text: 'Sculpture',
    },
    {
      value: 'FOOD_TO_GO',
      text: 'Food (To Go)',
    },
    {
      value: 3,
      text: 'Mural',
    },
    {
      value: 4,
      text: 'Bar',
    },
    {
      value: 5,
      text: 'Restaurant'
    }
  ];

  constructor(
    public navParams: NavParams,
    private locationService: LocationService,
  ) {
    this.editSegment = this.editSegments[navParams.get("tabId")];
    this.location = navParams.get("location");
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
