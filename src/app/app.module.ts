import {BrowserModule} from "@angular/platform-browser";
import {CloudModule, CloudSettings} from "@ionic/cloud-angular";
import {APP_INITIALIZER, ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {IonicStorageModule} from "@ionic/storage";

import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {ListPage} from "../pages/list/list";

import {RestangularConfigFactory} from "../providers/resources/resource.config";
import {RestangularModule} from "ngx-restangular/dist/esm/src";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";

import {SessionTokenService} from "../providers/session-token/session-token.service";
import {GeoLocComponent} from "../components/geo-loc/geo-loc";
import {LatLonComponent} from "../components/lat-lon/lat-lon";
import {LocEditPage} from "../pages/loc-edit/loc-edit";
import {LoginPage} from "../pages/login/login";
import {MarkersComponent} from "../components/markers/markers";
import {Resource} from "../providers/resources/resource";
import {LocEditPageModule} from "../pages/loc-edit/loc-edit.module";
import {MapComponentModule} from "../components/map/map.module";
import {DeviceGeoLocService} from "../providers/device-geo-loc/device-geo-loc.service";
import {MoveStartService} from "../providers/move-start/move-start";

/* TODO: place this inside the Google-specific OAuth module. */
export const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'd7271bbc'
  },
  'auth': {
    'google': {
      'webClientId': '989278627857-1bei5m1ek171qcb0ork8s1brnuacm84p.apps.googleusercontent.com',
      // 'offline': true,
      // 'scope': "email profile"
    }
  }
};

/* Assures credentials are loaded from storage before trying to show initial page. */
export function loadSessionToken(sessionTokenService: SessionTokenService) {
  return () => sessionTokenService.loadToken();
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    GeoLocComponent,
    MarkersComponent,
    LatLonComponent,
  ],
  imports: [
    BrowserModule,
    CloudModule.forRoot(cloudSettings),
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
    LoginPage,
  ],
  providers: [
    DeviceGeoLocService,
    GeoLocComponent,
    MarkersComponent,
    MoveStartService,
    Resource,
    SessionTokenService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: APP_INITIALIZER, useFactory: loadSessionToken, deps: [SessionTokenService], multi: true}
  ]
})
export class AppModule {}
