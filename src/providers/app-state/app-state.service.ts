import {AppState} from "./app-state";
import {AuthService, GeoLocService, PlatformStateService, RegistrationPage} from "front-end-common";
import {Injectable} from '@angular/core';
import {App, NavController, Platform} from "ionic-angular";
import {MapDataService} from "../map-data/map-data";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Observable} from "../../../../front-end-common/node_modules/rxjs";
import {HomePage} from "../../pages/home/home";
import {StatusPage} from "../../pages/status/status";

/**
 * Tracks the progression of tests and checks that are performed as the app
 * is brought up. Can also serve as an overall status page.
 */
@Injectable()
export class AppStateService {

  private appState: AppState = new AppState();
  private nav: NavController;
  private platformReady$: Observable<any>;

  constructor(
    private app: App,
    private platform: Platform,
    private authService: AuthService,
    private geoLoc: GeoLocService,
    private mapDataService: MapDataService,
    public platformStateService: PlatformStateService,
    public splashScreen: SplashScreen,
  ) {
    console.log('Hello AppStateService Provider');
    this.appState.isRunningBrowser = this.platformStateService.runningLocal();
    this.initPlatformReadyObservable();

    /* One of three Platform Ready calls. */
    this.onPlatformReady(this.awaitAppInitialization);

    if (!this.platformStateService.runningLocal()) {
      /* Map is ready; turn off splash screen. */
      this.splashScreen.hide();
    }

  }

  /**
   * Lazy initialization of the Platform Observable; will be initialized if someone needs it before we've
   * gotten it ready ourselves.
   */
  initPlatformReadyObservable() {
    /* Setup Platform Ready response to trigger whoever needs to listen for it. */
    this.platformReady$ = Observable.fromPromise(
      this.platform.ready()
    ).do(
      () => console.log("App State Service: Platform Ready")
    ).share();
  }

  /**
   * Accepts subscribers to the Platform Ready Observable
   * and creates the observable if it hasn't been done yet.
   * @param subscriberFunction - function to be executed when
   * the Platform becomes ready for business.
   */
  public onPlatformReady(subscriberFunction) {
    console.log("On Platform Ready - Subscriber Added");

    if (!this.platformReady$) {
      this.initPlatformReadyObservable();
    }

    this.platformReady$.subscribe(subscriberFunction);
  }

  /**
   * Sequences a number of components and services needed prior to
   * displaying the map page.
   */
  private awaitAppInitialization = (): void => {
    this.nav = <NavController>this.app.getRootNavById('n4');

    this.waitUntilDeviceRegistered().subscribe(
      (needsRegistration) => {
        if (needsRegistration) {
        } else {

          console.log("About to initialize caches");
          this.mapDataService.initializeCaches();

          /* Setup the positioning and map once we find out we have GPS available. */
          this.geoLoc.notifyWhenReady().subscribe(
            (response) => {
              let initialPosition = response;
              this.nav.setRoot(HomePage).then(
                () => {
                  return this.mapDataService.postInitialPosition(initialPosition);
                }
              );
            }
          );
        }
      }
    );

  };

  /** Exposes a summary of the Application State to clients of this service. */
  public getAppState(): AppState {
    return this.appState;
  }

  private waitUntilDeviceRegistered = (): Observable<any> => {
    console.log("1. Awaiting Device Registration");
    this.appState.registeredAs = 'Checking ...';

    return Observable.fromPromise(
      this.authService.checkRegistrationRequired()
    ).do(
      this.choosePage
    ).do(
      this.recordRegistrationState
    );

  };

  private choosePage = (needsRegistration: boolean): void => {
    this.nav.setRoot(StatusPage);
    if (needsRegistration) {
      this.nav.push(RegistrationPage);
    }
  };

  private recordRegistrationState = (needsRegistration: boolean): void => {
    if (needsRegistration) {
      console.log("Need to Register");
      this.appState.registeredAs = 'UNREGISTERED';
    } else {
      console.log("Registered and ready for action");
      this.appState.registeredAs = 'REGISTERED';
      // TODO: Put the profile lookup here so we can report who has registered this device.
    }

  }

}
