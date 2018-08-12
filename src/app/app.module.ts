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
import {GeoLocService} from "../providers/geo-loc/geo-loc";
import {LatLonComponent} from "../components/lat-lon/lat-lon";
import {LocEditPage} from "../pages/loc-edit/loc-edit";
import {MarkersComponent} from "../components/markers/markers";
import {Resource} from "../providers/resources/resource";
import {LocEditPageModule} from "../pages/loc-edit/loc-edit.module";
import {MapComponentModule} from "../components/map/map.module";
import {DeviceGeoLocService} from "../providers/device-geo-loc/device-geo-loc.service";
import {MoveStartService} from "../providers/move-start/move-start";
import {LatLonProvider} from "../providers/lat-lon/lat-lon";

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
    DeviceGeoLocService,
    GeoLocService,
    MarkersComponent,
    MoveStartService,
    Resource,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LatLonProvider,
  ]
})
export class AppModule {}
