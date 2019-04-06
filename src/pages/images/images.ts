import {Component} from '@angular/core';
import {Image, Location} from "front-end-common";
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

  location: Location;
  images: Image[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imageService: ImageService,
  ) {
    this.location = navParams.get("location");
    this.imageService.getAllImagesForLocation(this.location.id)
      .subscribe(
        (images) => {
          this.images = images;
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagesPage');
  }

  isFeaturedImage(imageId: number) {
    return imageId === this.location.featuredImage.id;
  }

  setFeaturedImage(imageId: number) {
    this.imageService.setFeaturedImage(this.location.id, imageId)
      .subscribe(
        (location) => {
          this.location.featuredImage = location.featuredImage;
        }
      );
  }

}
