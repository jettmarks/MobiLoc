import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {MapComponent} from "./map";
import {HeadingComponentModule} from "../heading/heading.module";

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    HeadingComponentModule,
    IonicPageModule.forChild(MapComponent),
  ],
  exports: [
    MapComponent
  ],
  providers: [
    MapComponent
  ]
})
export class MapComponentModule {}
