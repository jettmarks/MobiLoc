import {Camera, CameraOptions} from "@ionic-native/camera";
import {Component} from "@angular/core";
import {App, IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {ImageService} from "../../providers/image/image.service";
import {Location} from "front-end-common";
import {Observable} from "rxjs/Observable";

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
})
export class ImageCapturePage {

  public base64Image: string;
  public images: Array<any> = [];
  private location: Location;
  private nav: NavController;

  private cameraOptions: CameraOptions = {
    correctOrientation: true,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    quality: 90,
    targetWidth: 1000,
    targetHeight: 1000
  };

  constructor(
    private camera: Camera,
    public navParams: NavParams,
    private appCtrl: App,
    private loadingCtrl: LoadingController,
    private imageService: ImageService,
  ) {
    this.location = navParams.get("location");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageCapturePage');
    this.camera.getPicture(
      this.cameraOptions
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

  ionViewWillEnter() {
    this.nav = <NavController>this.appCtrl.getRootNavById("n4");
  }

  public haveImagesToShow(): boolean {
    return (this.images.length > 0);
  }

  public save() {
    const loading = this.loadingCtrl.create(
      {
        content: "Finding a good spot for that fine picture ..."
      }
    );
    loading.present();

    // What I'd prefer, but the Image isn't found anywhere
    // let image = new Image();
    // image.populateFromLocation(this.location);
    // image.addImageData(this.images[0].src);

    let formData = new FormData();
    let image = {
      locationId: this.location.id,
      lat: this.location.latLon.lat,
      lon: this.location.latLon.lon,
      fileData: new FormData()
    };

    let blob = new Blob([this.images[0].src], {type: "image/jpeg"});
    formData.append("locationId", "" + image.locationId);
    formData.append("lat", "" + image.lat);
    formData.append("lon", "" + image.lon);
    formData.append("fileData", blob, "cameraImage.jpg");
    this.imageService.uploadImage(formData).subscribe(
      (image) => {
        console.log("New Image ID: " + image.id);
        loading.dismissAll();
        Observable.fromPromise(this.nav.pop()).subscribe(
          () => {console.log("Have returned from Pop");}
        );
      }
    );

  }

  fakeImage() {
    this.images.unshift({src: "Test Data"});
  }

}
