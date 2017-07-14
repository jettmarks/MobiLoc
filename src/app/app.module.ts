import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {CloudModule, CloudSettings} from "@ionic/cloud-angular";

import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {ListPage} from "../pages/list/list";

import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";

import {GeoLocComponent} from "../components/geo-loc/geo-loc";
import {MapComponent} from "../components/map/map";
import {MarkersComponent} from "../components/markers/markers";
import {LoginPage} from "../pages/login/login";
import {LocationResource} from "../providers/resources/location/location.service";
import {ResourceModule} from "ngx-resource";
import {BadgeResource} from "../providers/resources/badge/badge.service";

const cloudSettings: CloudSettings = {
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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    GeoLocComponent,
    MapComponent,
    MarkersComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    ResourceModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
  ],
  providers: [
    GeoLocComponent,
    LocationResource,
    MapComponent,
    MarkersComponent,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BadgeResource,
  ]
})
export class AppModule {}
