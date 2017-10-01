import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {LocEditPage} from "./loc-edit";

@NgModule({
  declarations: [
    LocEditPage,
  ],
  imports: [
    IonicPageModule.forChild(LocEditPage),
  ],
})
export class LocEditPageModule {}
