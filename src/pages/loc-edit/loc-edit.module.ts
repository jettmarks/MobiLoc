import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {LocEditPage} from "./loc-edit";
import {DraftPage} from "../draft/draft";

@NgModule({
  declarations: [
    LocEditPage,
    DraftPage,
  ],
  imports: [
    IonicPageModule.forChild(LocEditPage),
  ]
})
export class LocEditPageModule {}
