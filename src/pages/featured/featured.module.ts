import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {FeaturedPage} from "./featured";

@NgModule({
  declarations: [
    FeaturedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeaturedPage),
  ],
  exports: [
    FeaturedPage
  ]
})
export class FeaturedPageModule {}
