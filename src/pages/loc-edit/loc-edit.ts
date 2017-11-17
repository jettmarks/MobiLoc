import {Component} from "@angular/core";
import {AlertController, App, IonicPage, NavParams} from "ionic-angular";
import {LocationService} from "../../providers/resources/location/location.service";
import {locationServiceProvider} from "../../providers/resources/location/location.service.provider";
import {LocationTypeService} from "../../providers/resources/loctype/loctype.service";
import {locationTypeServiceProvider} from "../../providers/resources/loctype/loctype.service.provider";
import {ImageCapturePage} from "../image-capture/image-capture";
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
    private alertCtrl: AlertController,
    private appCtrl: App,
    private locationService: LocationService,
    private locationTypeService: LocationTypeService,
    private navParams: NavParams,
    private restangular: Restangular,
  ) {
    this.editSegment = this.editSegments[navParams.get("tabId")];
    this.location = navParams.get("location");

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

  ionViewDidEnter() {
    this.restangular.one('location').get({'id': this.location.id}).subscribe(
      (locData) => {this.location = locData}
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

  captureImage() {
    console.log("Opening Camera");
    this.appCtrl.getRootNav().push(ImageCapturePage, {
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
