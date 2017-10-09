import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {LocEditPage} from "./loc-edit";
import {locationServiceProvider} from "../../providers/resources/location/location.service.provider";
import {LocationService} from "../../providers/resources/location/location.service";

@NgModule({
  declarations: [
    LocEditPage,
  ],
  imports: [
    IonicPageModule.forChild(LocEditPage),
  ],
  providers: [
    locationServiceProvider,
    LocationService
  ]
})
export class LocEditPageModule {}
