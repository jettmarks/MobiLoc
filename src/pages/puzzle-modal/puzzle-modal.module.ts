import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {PuzzleModalPage} from "./puzzle-modal";

@NgModule({
  declarations: [
    PuzzleModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PuzzleModalPage),
  ],
  exports: [
    PuzzleModalPage
  ]
})
export class PuzzleModalPageModule {}
