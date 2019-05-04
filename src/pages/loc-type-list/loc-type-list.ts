import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {LocationType, LocTypeService} from "front-end-common";

/**
 * Presents a list of the Location Types available.
 */

@IonicPage()
@Component({
  selector: 'page-loc-type-list',
  templateUrl: 'loc-type-list.html',
})
export class LocTypeListPage {

  locTypes: LocationType[];

  constructor(
    private locationTypeService: LocTypeService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocTypeListPage');
  }

  ionViewWillEnter(): void {
    this.reloadLocTypes();
  }

  /** Make sure we've got a currently ordered list of Loc Types. */
  reloadLocTypes(): void {
    this.locTypes = [];
    this.locationTypeService.allLocationTypes().forEach(
      (locationType) => {
        this.locTypes.push(locationType);
      }
    );
  }

}
