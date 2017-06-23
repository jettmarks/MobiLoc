import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeoLocComponent } from './geo-loc';

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
    Geolocation
  ]
})
export class GeoLocComponentModule {}
