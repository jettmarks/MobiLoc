import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeadingComponent } from './heading';
import {DeviceOrientation} from "@ionic-native/device-orientation";

@NgModule({
  declarations: [
    HeadingComponent,
  ],
  imports: [
    IonicPageModule.forChild(HeadingComponent),
  ],
  exports: [
    HeadingComponent
  ],
  providers: [
    HeadingComponent,
    DeviceOrientation
  ]
})
export class HeadingComponentModule {}
