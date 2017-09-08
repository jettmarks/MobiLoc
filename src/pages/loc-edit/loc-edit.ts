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

  draftRoot = 'DraftPage';
  attractionRoot = 'AttractionPage';
  featuredRoot = 'FeaturedPage';
  tabId: number;
  locationId: number;
  location: clueRide.Location;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabId = navParams.get("tabId");
    this.location = navParams.get("location");
  }

}
