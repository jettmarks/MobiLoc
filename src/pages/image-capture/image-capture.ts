import {Camera, CameraOptions} from "@ionic-native/camera";
import {Component} from "@angular/core";
import {IonicPage, NavParams} from "ionic-angular";
// import clueRide from "../../providers/resources/image/image.ts";
// import clueRide from "../../providers/resources/location/location.ts";
import {ImageService} from "../../providers/resources/image/image.service";
import {imageServiceProvider} from "../../providers/resources/image/image.service.provider";
import {Restangular} from "ngx-restangular";

/**
 * Generated class for the ImageCapturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-image-capture',
  templateUrl: 'image-capture.html',
  providers: [
    ImageService,
    imageServiceProvider
  ],
})
export class ImageCapturePage {

  public base64Image: string;
  public images: Array<any> = [];
  private options: CameraOptions = {
    correctOrientation: true,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    quality: 90,
    targetWidth: 1000,
    targetHeight: 1000
  };
  private location: clueRide.Location;

  constructor(
    private camera: Camera,
    public navParams: NavParams,
    private restangular: Restangular,
  ) {
    this.location = navParams.get("location");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageCapturePage');
    this.camera.getPicture(
      this.options
    ).then((imageData) => {
      //   imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.images.unshift(
        {src: this.base64Image}
      );
    }, (err) => {
      console.log(err);
    });
  }

  public haveImagesToShow(): boolean {
    return (this.images.length > 0);
  }

  save() {
    // What I'd prefer, but the clueRide.Image isn't found anywhere
    // let image = new clueRide.Image();
    // image.populateFromLocation(this.location);
    // image.addImageData(this.images[0].src);

    let formData = new FormData();
    let image = {
      locId: this.location.id,
      lat: this.location.latLon.lat,
      lon: this.location.latLon.lon,
      file: new FormData()
    };

    let blob = new Blob([this.images[0].src], {type: "image/jpeg"});
    formData.append("locId", "" + image.locId);
    formData.append("lat", "" + image.lat);
    formData.append("lon", "" + image.lon);
    formData.append("file", blob, "cameraImage.jpg");

    // this.imageService.uploadImage(image);
    this.restangular.all("location/uploadImage")
      .customPOST(
        formData,
        undefined,
        undefined,
        {'Content-Type': undefined}
      );

  }

  fakeImage() {
    this.images.unshift({src: "Test Data"});
  }

}
