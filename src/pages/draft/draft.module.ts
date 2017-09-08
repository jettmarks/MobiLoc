import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {DraftPage} from "./draft";

@NgModule({
  declarations: [
    DraftPage,
  ],
  imports: [
    IonicPageModule.forChild(DraftPage),
  ],
  exports: [
    DraftPage
  ]
})
export class DraftPageModule {}
