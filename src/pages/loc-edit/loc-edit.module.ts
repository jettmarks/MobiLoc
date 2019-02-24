import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {LocEditPage} from "./loc-edit";
import {PuzzleListComponentModule} from "../../components/puzzle-list/puzzle-list.module";
import {ImageCapturePageModule} from "../image-capture/image-capture.module";

@NgModule({
  declarations: [
    LocEditPage,
  ],
  imports: [
    ImageCapturePageModule,
    IonicPageModule.forChild(LocEditPage),
    PuzzleListComponentModule,
  ],
})
export class LocEditPageModule {}
