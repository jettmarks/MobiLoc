import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {IonicStorageModule} from "@ionic/storage";

import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {ListPage} from "../pages/list/list";

import {RestangularConfigFactory} from "../providers/resources/resource.config";
import {RestangularModule} from "ngx-restangular/dist/esm/src";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";

import {ComponentsModule} from "front-end-common";
import {LatLonComponent} from "../components/lat-lon/lat-lon";
import {LocEditPage} from "../pages/loc-edit/loc-edit";
import {MarkersComponent} from "../components/markers/markers";
import {Resource} from "../providers/resources/resource";
import {LocEditPageModule} from "../pages/loc-edit/loc-edit.module";
import {MapComponentModule} from "../components/map/map.module";
import {MapMoveService} from "../providers/map-move/map-move";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MarkersComponent,
    LatLonComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({driverOrder:  ['localstorage', 'sqlite', 'indexeddb', 'websql']}),
    LocEditPageModule,
    MapComponentModule,
    RestangularModule.forRoot(RestangularConfigFactory),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocEditPage,
    HomePage,
    ListPage,
  ],
  providers: [
    MarkersComponent,
    MapMoveService,
    Resource,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
