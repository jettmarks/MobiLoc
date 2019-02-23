import {Component} from "@angular/core";
import {AlertController, IonicPage, NavController, NavParams} from "ionic-angular";
import {Location, LocationService} from "front-end-common";
import {LocTypeService} from "../../providers/loc-type/loc-type.service";
import {ImageCapturePage} from "../image-capture/image-capture";
// tslint:disable-next-line
import {Restangular} from "ngx-restangular";

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
    LocTypeService,
  ]
})
@IonicPage()
export class LocEditPage {

  editSegment: string;
  location: Location;
  private editSegments = [
    'draft',
    'attraction',
    'featured'
  ];

  locTypes = [];

  constructor(
    private alertCtrl: AlertController,
    private locationService: LocationService,
    private locationTypeService: LocTypeService,
    private navParams: NavParams,
    private restangular: Restangular,
    private navCtrl: NavController,
  ) {
    this.editSegment = this.editSegments[this.navParams.get("tabId")];
    this.location = this.navParams.get("location");

  }

  ionViewWillEnter() {
    this.reloadLocTypes();
  }

  /** Make sure we've got a currently ordered list of Loc Types. */
  reloadLocTypes() {
    this.locTypes = [];
    this.locationTypeService.allLocationTypes().forEach(
      (locationType) => {
        this.locTypes.push(
          {
            value: locationType.id,
            text: locationType.name
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
    this.locationTypeService.recentToTop(this.location.locationTypeId);
    this.locationService.update(this.location).subscribe(
      (updatedLocation: Location) => {
        // TODO: put this updated value on the map
      }
    );
    this.navCtrl.pop();
  }

  captureImage() {
    console.log("Opening Camera");
    this.navCtrl.push(ImageCapturePage, {
      location: this.location
    });
  }

  showImageActions() {
    console.log("Show Image Actions");
    let alert = this.alertCtrl.create({
      title: 'Unlink this Image?',
      message: 'Do you want to unset the Featured Image? (Image can be re-featured later)',
      buttons: [
        {
          text: 'Keep Featured Image',
          handler: () => {
            console.log('Keep');
          }
        },
        {
          text: 'Unset Featured Image',
          handler: () => {
            console.log('Removing Featured Image');
            this.restangular.one("location", this.location.id).one("featured").remove().toPromise().then(
              (location) => {this.location = location}
            );
          }
        }
      ]
    });

    alert.present();
  }

}
