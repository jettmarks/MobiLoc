import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MarkersComponent} from './markers';

@NgModule({
  declarations: [
    MarkersComponent,
  ],
  imports: [
    IonicPageModule.forChild(MarkersComponent),
  ],
  exports: [
    MarkersComponent
  ],
})
export class MarkersComponentModule {}
