/**
 * Created by jett on 6/25/17.
 */
import {Geolocation} from '@ionic-native/geolocation';
import {GeoLocComponent} from './geo-loc';
import {TestBed} from "@angular/core/testing";
import {Platform} from "ionic-angular";

let toTest : GeoLocComponent;

describe("Geo-Location", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // declarations: [GeoLocComponent],
      providers: [
        Geolocation,
        GeoLocComponent,
        Platform
      ]
    });
    toTest = TestBed.get(GeoLocComponent);
  });

  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

  xit("should define current position", () => {
    let actual = toTest.currentPosition();
    expect(actual).toBeDefined();
    expect(actual).not.toBe(null);
  });

  xit("should have two values in an array", () => {
    let actual = toTest.currentPosition();
    expect(actual.length).toBe(2);
  });

  it("should be inactive if the underlying system isn't ready", () => {
    let actual = toTest.isReady();
    expect(actual).toBeFalsy();
  });

  xit("should be active once we ask it to turn on", () => {
    toTest.checkPlatform();
    let actual = toTest.isReady();
    expect(actual).toBeTruthy();
  });

  describe("Watching Tether", () => {
    it("should receive position information from Team's Guide (via server)", () => {

    });
  });

  describe("Watching internal GPS", () => {
    it("should receive position from device", () => {

    });
  });
});
