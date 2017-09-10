import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {LatLonComponent} from "./lat-lon";

@NgModule({
  declarations: [
    LatLonComponent,
  ],
  imports: [
    IonicPageModule.forChild(LatLonComponent),
  ],
  exports: [
    LatLonComponent
  ]
})
export class LatLonComponentModule {}
