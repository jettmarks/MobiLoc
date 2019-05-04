import {ErrorHandler, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {SplashScreen} from "@ionic-native/splash-screen";

import {StatusBar} from "@ionic-native/status-bar";
import {IonicStorageModule} from "@ionic/storage";
import {ComponentsModule, ConnectionStateComponentModule, LocTypeChipModule} from "front-end-common";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {LatLonComponent} from "../components/lat-lon/lat-lon";
import {MapComponentModule} from "../components/map/map.module";
import {MarkersComponent} from "../components/markers/markers";
import {HomePage} from "../pages/home/home";
import {ImageCapturePageModule} from "../pages/image-capture/image-capture.module";
import {ImagesPage} from "../pages/images/images";
import {ImagesPageModule} from "../pages/images/images.module";
import {LocEditPage} from "../pages/loc-edit/loc-edit";
import {LocEditPageModule} from "../pages/loc-edit/loc-edit.module";
import {LocTypeListPage} from "../pages/loc-type-list/loc-type-list";

import {StatusPage} from "../pages/status/status";
import {AppStateService} from '../providers/app-state/app-state.service';
import {ImageService} from "../providers/image/image.service";
import {MapDataService} from "../providers/map-data/map-data";

import {MapDragService} from "../providers/map-drag/map-drag";
import {MyApp} from "./app.component";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocTypeListPage,
    StatusPage,
    MarkersComponent,
    LatLonComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({driverOrder:  ['localstorage', 'sqlite', 'indexeddb', 'websql']}),
    ConnectionStateComponentModule,
    ImageCapturePageModule,
    ImagesPageModule,
    LocEditPageModule,
    LocTypeChipModule,
    MapComponentModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocEditPage,
    HomePage,
    ImagesPage,
    LocTypeListPage,
    StatusPage,
  ],
  providers: [
    AppStateService,
    ImageService,
    MarkersComponent,
    MapDataService,
    MapDragService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
