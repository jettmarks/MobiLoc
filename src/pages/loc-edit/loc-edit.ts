import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";

/**
 * Generated class for the LocEditPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-loc-edit',
  templateUrl: 'loc-edit.html'
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
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.editSegment = this.editSegments[navParams.get("tabId")];
    this.location = navParams.get("location");
  }

}
