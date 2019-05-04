import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LocTypeListPage} from './loc-type-list';
import {LocTypeChipModule} from "front-end-common";

@NgModule({
  declarations: [
    LocTypeListPage,
  ],
  imports: [
    IonicPageModule.forChild(LocTypeListPage),
    LocTypeChipModule,
  ],
})
export class LocTypeListPageModule {}
