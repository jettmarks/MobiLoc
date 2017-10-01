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

import {Creds} from "../providers/creds/creds.service";
import {GeoLocComponent} from "../components/geo-loc/geo-loc";
import {LatLonComponent} from "../components/lat-lon/lat-lon";
import {LocEditPage} from "../pages/loc-edit/loc-edit";
import {LoginPage} from "../pages/login/login";
import {MapComponent} from "../components/map/map";
import {MarkersComponent} from "../components/markers/markers";
import {Resource} from "../providers/resources/resource";

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
function loadCreds(creds: Creds) {
  return () => creds.loadToken();
}

@NgModule({
  declarations: [
    MyApp,
    LocEditPage,
    HomePage,
    ListPage,
    LoginPage,
    GeoLocComponent,
    MapComponent,
    MarkersComponent,
    LatLonComponent,
  ],
  imports: [
    BrowserModule,
    CloudModule.forRoot(cloudSettings),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({driverOrder:  ['localstorage', 'sqlite', 'indexeddb', 'websql']}),
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
    Creds,
    GeoLocComponent,
    MapComponent,
    MarkersComponent,
    Resource,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: APP_INITIALIZER, useFactory: loadCreds, deps: [Creds], multi: true}
  ]
})
export class AppModule {}
