import {HeadingComponent} from "./heading";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {IonicModule} from "ionic-angular";
import {DeviceOrientation, DeviceOrientationCompassHeading} from "@ionic-native/device-orientation";
import {DeviceOrientationMock} from "../../mocks";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
/**
 * Created by jett on 11/6/17.
 */

let toTest: HeadingComponent;
let fixture: ComponentFixture<HeadingComponent>;
const headingResponse: DeviceOrientationCompassHeading = {
  trueHeading: 90.0,
  magneticHeading: 90.0,
  headingAccuracy: null,
  timestamp: null
};

describe("Heading", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeadingComponent
      ],
      imports: [
        IonicModule.forRoot(HeadingComponent)
      ],
      providers: [
        HeadingComponent,
        {provide: DeviceOrientation, useClass: DeviceOrientationMock},
      ]
    });
  });

  describe("compass availability", () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(HeadingComponent);
    });

    it("should report compass when it is available", async(() => {
      /* setup data */
      fixture.detectChanges();
      let deviceOrientation = fixture.debugElement.injector.get(DeviceOrientation);
      toTest = fixture.componentInstance;

      /* train mocks */
      spyOn(deviceOrientation, 'getCurrentHeading').and.returnValue(
        Promise.resolve(headingResponse)
      );

      /* make call */
      toTest.checkCompassAvailability();

      /* verify results */
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(toTest.deviceHasCompass).toBe(true);
      });

    }));

    it("should report no compass when not present", () => {
      /* setup data */
      let deviceOrientation = fixture.debugElement.injector.get(DeviceOrientation);
      toTest = fixture.componentInstance;

      /* train mocks */
      spyOn(deviceOrientation, 'getCurrentHeading').and.returnValue(
        Promise.reject({})
      );

      /* make call */
      toTest.checkCompassAvailability();

      /* verify results */
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(toTest.deviceHasCompass).toBe(false);
      });

    });

  });

  describe("watch lifecycle", () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(HeadingComponent);
      toTest = fixture.componentInstance;
    });

    it("should be defined", () => {
      expect(toTest).toBeDefined();
    });

    it("should begin watching for compass heading changes when activated", () => {
      /* setup data */
      let compassHeadingObservable: Observable<DeviceOrientationCompassHeading> = new Subject().asObservable();
      let deviceOrientation = fixture.debugElement.injector.get(DeviceOrientation);

      /* train mocks */
      let watchHeadingSpy = spyOn(deviceOrientation, 'watchHeading');
      watchHeadingSpy.and.returnValue(compassHeadingObservable);
      let compassObservableSpy = spyOn(compassHeadingObservable, 'subscribe');
      spyOn(deviceOrientation, 'getCurrentHeading').and.returnValue(
        Promise.resolve(headingResponse)
      );
      fixture.detectChanges();

      /* make call */
      toTest.checkCompassAvailability();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        toTest.getHeadingMarker();
      });

      /* verify results */
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(watchHeadingSpy.calls.any()).toBe(true, 'watchHeading is called');
        expect(compassObservableSpy.calls.any()).toBe(true);
      });

    });

    it("should stop watching for compass heading changes when de-activated", () => {
      /* setup data */
      let compassSubscriptionSpy;
      let compassHeadingObservable: Observable<DeviceOrientationCompassHeading> = new Subject().asObservable();
      let deviceOrientation = fixture.debugElement.injector.get(DeviceOrientation);
      let compassHeadingSubscription: Subscription = new Subscription();

      /* train mocks */
      spyOn(deviceOrientation, 'watchHeading').and.returnValue(compassHeadingObservable);
      spyOn(compassHeadingObservable, 'subscribe').and.returnValue(compassHeadingSubscription);
      toTest.deviceHasCompass = true;
      toTest.getHeadingMarker();
      spyOn(deviceOrientation, 'getCurrentHeading').and.returnValue(
        Promise.resolve(headingResponse)
      );
      fixture.detectChanges();

      /* make call */
      toTest.checkCompassAvailability();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(toTest.subscription).toBeDefined();
        compassSubscriptionSpy = spyOn(toTest.subscription, 'unsubscribe');
        toTest.releaseHeadingMarker();
      });

      /* verify results */
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(compassSubscriptionSpy.calls.any()).toBe(true);
      });
    });

  });

});
