import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {IonicStorageModule} from "@ionic/storage";

import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {ListPage} from "../pages/list/list";

import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";

import {AppStateService} from '../providers/app-state/app-state.service';
import {ComponentsModule, HeartbeatComponentModule} from "front-end-common";
import {ImageService} from "../providers/image/image.service";
import {LatLonComponent} from "../components/lat-lon/lat-lon";
import {LocEditPage} from "../pages/loc-edit/loc-edit";
import {LocTypeService} from "../providers/loc-type/loc-type.service";
import {MarkersComponent} from "../components/markers/markers";
import {LocEditPageModule} from "../pages/loc-edit/loc-edit.module";
import {MapComponentModule} from "../components/map/map.module";
import {MapDataService} from "../providers/map-data/map-data";
import {MapDragService} from "../providers/map-drag/map-drag";
import {StatusPage} from "../pages/status/status";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    StatusPage,
    MarkersComponent,
    LatLonComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({driverOrder:  ['localstorage', 'sqlite', 'indexeddb', 'websql']}),
    HeartbeatComponentModule,
    LocEditPageModule,
    MapComponentModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocEditPage,
    HomePage,
    ListPage,
    StatusPage,
  ],
  providers: [
    AppStateService,
    ImageService,
    LocTypeService,
    MarkersComponent,
    MapDataService,
    MapDragService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
