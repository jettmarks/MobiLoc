import Auth0Cordova from "@auth0/cordova";
import {AppStateService} from "../providers/app-state/app-state.service";
import {AuthService, PlatformStateService} from "front-end-common";
import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {HomePage} from "../pages/home/home";
import {LocEditPage} from "../pages/loc-edit/loc-edit";
import {LocTypeListPage} from "../pages/loc-type-list/loc-type-list";
import {StatusBar} from "@ionic-native/status-bar";
import {StatusPage} from "../pages/status/status";

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
      { title: 'Loc Types', component: LocTypeListPage },
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

}
