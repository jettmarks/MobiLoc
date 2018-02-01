import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {GeoLocComponent} from "./geo-loc";
import {DeviceGeoLocService} from "../../providers/device-geo-loc/device-geo-loc.service";
import {Restangular} from "ngx-restangular";

/**
 * Picks up location information either from GPS or as tethered to
 * a Guide's position.
 */
@NgModule({
  declarations: [
    GeoLocComponent,
  ],
  imports: [
    IonicPageModule.forChild(GeoLocComponent),
  ],
  exports: [
    GeoLocComponent
  ],
  providers: [
    DeviceGeoLocService,
    Restangular
  ]
})
export class GeoLocComponentModule {}
