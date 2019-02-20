import Auth0Cordova from "@auth0/cordova";
import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {AuthService, PlatformStateService, RegistrationPage} from "front-end-common";
import {HomePage} from "../pages/home/home";
import {ListPage} from "../pages/list/list";
import {LocEditPage} from "../pages/loc-edit/loc-edit";
import {StatusPage} from "../pages/status/status";
import {AppStateService} from "../providers/app-state/app-state.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    private appStateService: AppStateService,
    public authService: AuthService,
    public platformStateService: PlatformStateService,
  ) {

    console.log("App is constructing");

    /** Populates the Menu. */
    this.pages = [
      { title: 'Map', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Edit', component: LocEditPage },
      { title: 'Status', component: StatusPage },
    ];

  }

  ngOnInit() {
    console.log("App is initializing");

    /* Tell App State what we need done once the Platform is Ready for business. */
    /* One of three Platform Ready calls. */
    this.appStateService.onPlatformReady(this.initializeApp);
    this.authService.setUrlScheme("com.clueride.mobiloc");

    /* TODO: Move into App State. */
    this.checkDeviceRegistered();
  }

  private initializeApp = () => {
    console.log("App Module: Platform Ready - can begin to look for Device Features");
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.

    if (!this.platformStateService.runningLocal()) {
      /* Since this is a cordova native statusbar, only set style if not within a browser (local). */
      this.statusBar.styleDefault();
    }

    /* Handles the return to the app after logging in at external site. */
    (<any>window).handleOpenURL = (url) => {
      console.log("Redirecting custom scheme: " + url);
      Auth0Cordova.onRedirectUri(url);
    }

  };

  /** This is how the Menu is able to change pages. */
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  /** Bring up Registration page if not yet registered; otherwise, wait for fresh token. */
  private checkDeviceRegistered() {
    this.authService.checkRegistrationRequired().then(
      (needsRegistration) => {
        let pageReadyPromise: Promise<void>;

        pageReadyPromise = this.nav.setRoot(HomePage);
        if (needsRegistration) {
          pageReadyPromise = this.nav.push(RegistrationPage);
        }

        pageReadyPromise.then(
          () => {
            // this.splashScreen.hide();
          }
        );
      }

    );
  }
}
