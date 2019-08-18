import {AppStateService} from "../providers/app-state/app-state.service";
import {ConfirmPage, PlatformStateService, RegistrationPage, RegStateKey, RegStateService,} from "front-end-common";
import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {HomePage} from "../pages/home/home";
import {LocEditPage} from "../pages/loc-edit/loc-edit";
import {LocTypeListPage} from "../pages/loc-type-list/loc-type-list";
import {StatusBar} from "@ionic-native/status-bar";
import {StatusPage} from "../pages/status/status";
import {filter, find} from "rxjs/operators";

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
    public appStateService: AppStateService,
    public platformStateService: PlatformStateService,
    private regStateService: RegStateService,
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

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("Platform ready");

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this.platformStateService.isNativeMode()) {
        /* Since this is a cordova native statusbar, only set style if not within a browser (local). */
        this.statusBar.styleDefault();
      }

      this.setupRegStateResponse();
    });
  };

  /**
   * Triggers the check of a Registration State to make sure our Access Token is ready.
   *
   * If registration/confirmation are required, we provide the pages from within our navigation scheme;
   * those pages will feed back into changes of the Registration State that we pick up via the stream.
   */
  private setupRegStateResponse(): void {

    const regStateObservable = this.regStateService.requestRegState(
      "com.clueride.mobiloc"
    );

    /* Handle Registration -- generally, a one-time occurrence, but there are re-tries. */
    regStateObservable.pipe(
      filter(regState => regState.state === RegStateKey.REGISTRATION_REQUIRED)
    ).subscribe(regState => {
      console.log("We need to show the Registration Page");
      this.nav.setRoot(RegistrationPage)
        .then()
        .catch(error => console.error("Did not get Registration Page", error));
    });

    /* Handle Profile Confirmation -- generally, a one-time occurrence, but there are re-tries. */
    regStateObservable.pipe(
      filter(regState => regState.state === RegStateKey.CONFIRMATION_REQUIRED)
    ).subscribe( regState => {
        console.log("We need to show the Confirmation Page");
        this.nav.setRoot(ConfirmPage)
          .then()
          .catch(error => console.error("Did not get Registration Page", error));
      }
    );

    /* Handle Active Session -- typical case. */
    regStateObservable.pipe(
      find(regState => regState.state === RegStateKey.ACTIVE)
    ).subscribe(regState => {
        console.log("Active by the grace of", regState.source );

        /* Proceed with the application. */
        this.appStateService.registrationIsNowActive();
      }
    );

  }

  /** This is how the Menu is able to change pages. */
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ngOnInit() {
    this.initializeApp();
    console.log("App is initialized");
  }

}
