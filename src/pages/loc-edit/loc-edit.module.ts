import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {LocEditPage} from "./loc-edit";
import {locationServiceProvider} from "../../providers/resources/location/location.service.provider";
import {LocationService} from "../../providers/resources/location/location.service";
import {PuzzleListComponentModule} from "../../components/puzzle-list/puzzle-list.module";

@NgModule({
  declarations: [
    LocEditPage,
  ],
  imports: [
    IonicPageModule.forChild(LocEditPage),
    PuzzleListComponentModule,
  ],
  providers: [
    locationServiceProvider,
    LocationService,
  ]
})
export class LocEditPageModule {}
