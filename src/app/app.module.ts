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

import {AppStateService} from '../providers/app-state/app-state.service';
import {ComponentsModule} from "front-end-common";
import {LatLonComponent} from "../components/lat-lon/lat-lon";
import {LocEditPage} from "../pages/loc-edit/loc-edit";
import {MarkersComponent} from "../components/markers/markers";
import {Resource} from "../providers/resources/resource";
import {LocEditPageModule} from "../pages/loc-edit/loc-edit.module";
import {MapComponentModule} from "../components/map/map.module";
import {MapDataService} from "../providers/map-data/map-data";
import {MapDragService} from "../providers/map-drag/map-drag";
import {StatusPage} from "../pages/status/status";
import {locationTypeServiceProvider} from "../providers/resources/loctype/loctype.service.provider";
import {LocationTypeService} from "../providers/resources/loctype/loctype.service";

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
    StatusPage,
  ],
  providers: [
    AppStateService,
    LocationTypeService,
    MarkersComponent,
    MapDataService,
    MapDragService,
    Resource,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    locationTypeServiceProvider,
  ]
})
export class AppModule {}
