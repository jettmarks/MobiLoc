import {Component} from '@angular/core';
import {Image} from "front-end-common";
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ImageService} from "../../providers/image/image.service";

/**
 * Presents all images associated with a Location.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-images',
  templateUrl: 'images.html',
})
export class ImagesPage {

  locationId: number;
  images: Image[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imageService: ImageService,
  ) {
    this.locationId = navParams.get("locationId");
    this.imageService.getAllImagesForLocation(this.locationId)
      .subscribe(
        (images) => {
          this.images = images;
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagesPage');
  }

}
