import {Injectable} from '@angular/core';
import {AppState} from "./app-state";
import {
  AuthService,
  AuthState,
  GeoLocService,
  PlatformStateService,
  ProfileConfirmationService,
  ProfileService,
  RegistrationPage
} from "front-end-common";
import {App, NavController, Platform} from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import {MapDataService} from "../map-data/map-data";
import {Observable} from "rxjs/Observable";
import {SplashScreen} from "@ionic-native/splash-screen";
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
    public profileService: ProfileService,
    private profileConfirmationService: ProfileConfirmationService,
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
      (registrationState) => {
        if (registrationState === AuthState.REGISTERED) {

          console.log("About to initialize caches");
          this.appState.cacheState = "empty";
          const cacheInit$ = this.mapDataService.initializeCaches();

          cacheInit$.subscribe(
            () => {
              this.appState.cacheState = "filled";
            }
          );

          this.geoLoc.notifyWhenReady().subscribe(
            (initialPosition) => {
              console.log("We do get something out");
              this.nav.setRoot(HomePage).then(
                () => {
                  return this.mapDataService.postInitialPosition(
                    initialPosition
                  );
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
    this.appState.registrationState = 'Checking ...';

    return this.authService.getRegistrationState()
      .do(this.choosePage)
      .do(this.recordRegistrationState);
  };

  private choosePage = (authState: AuthState): void => {
    this.nav.setRoot(StatusPage);
    if (authState === AuthState.UNREGISTERED) {
      this.nav.push(RegistrationPage);
      /* Hook into notification that selected email has been confirmed. */
      this.profileConfirmationService.confirmationState$.subscribe(
        (confirmationState) => {

          if (confirmationState.confirmed) {
            console.log("Accepting the given email");
            this.recordRegistrationState(AuthState.REGISTERED);
            this.nav.pop()
              .then(
                () => this.nav.pop()
              )
              .catch(
                () => console.log("Problem Popping out of Confirmation Page")
              );
          } else {
            console.log("Choosing a different email");
          }
        }
      );
    }
  };

  private recordRegistrationState = (authState: AuthState): void => {
    this.appState.registrationState = AuthState[authState];
    if (authState === AuthState.REGISTERED) {
      console.log("Registered and ready for action");
      this.appState.registeredAs = 'REGISTERED';
      this.profileService.loadMemberProfile();
    }

  };

}
