import {AppState} from "./app-state";
import {GeoLocService, PlatformStateService} from "front-end-common";
import {Injectable} from '@angular/core';
import {Platform} from "ionic-angular";
import {MapDataService} from "../map-data/map-data";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Observable} from "../../../../front-end-common/node_modules/rxjs";

/**
 * Tracks the progression of tests and checks that are performed as the app
 * is brought up. Can also serve as an overall status page.
 */
@Injectable()
export class AppStateService {

  private appState: AppState = new AppState();
  private platformReady$: Observable<any>;

  constructor(
    private platform: Platform,
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
    console.log("About to initialize caches");
    this.mapDataService.initializeCaches();
    /* Setup the positioning and map once we find out we have GPS available. */
    this.geoLoc.notifyWhenReady().subscribe(
      (response) => {
        this.mapDataService.postInitialPosition(response);
      }
    );
  };

  /** Exposes a summary of the Application State to clients of this service. */
  public getAppState(): AppState {
    return this.appState;
  }

}
