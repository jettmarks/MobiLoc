import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ImageCapturePage} from "./image-capture";
import {Camera} from "@ionic-native/camera";

@NgModule({
  declarations: [
    ImageCapturePage,
  ],
  imports: [
    IonicPageModule.forChild(ImageCapturePage),
  ],
  exports: [
    ImageCapturePage
  ],
  providers: [
    Camera
  ]
})
export class ImageCapturePageModule {}
