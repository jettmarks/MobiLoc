import {NgModule} from "@angular/core";
import {PuzzleListComponent} from "./puzzle-list";
import {IonicModule} from "ionic-angular";
@NgModule({
  declarations: [
    PuzzleListComponent,
  ],
  imports: [
    IonicModule.forRoot(PuzzleListComponent)
  ],
  exports: [
    PuzzleListComponent,
  ]
})
export class PuzzleListComponentModule {}
