import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {LatLonComponent} from "./lat-lon";
import {GeoLocComponentModule} from "../geo-loc/geo-loc.module";

@NgModule({
  declarations: [
    LatLonComponent,
  ],
  imports: [
    IonicPageModule.forChild(LatLonComponent),
    GeoLocComponentModule,
  ],
  exports: [
    LatLonComponent
  ]
})
export class LatLonComponentModule {}
