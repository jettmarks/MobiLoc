/**
 * Created by jett on 6/25/17.
 */
import {GeoLocComponent} from "./geo-loc";
import {TestBed} from "@angular/core/testing";
import {Platform} from "ionic-angular";

let toTest : GeoLocComponent;

describe("Geo-Location", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoLocComponent,
        Platform
      ]
    });
    toTest = TestBed.get(GeoLocComponent);
  });

  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

  describe("Watching Tether", () => {
    it("should receive position information from Team's Guide (via server)", () => {

    });
  });

  describe("Watching internal GPS", () => {
    it("should receive position from device", () => {

    });
  });

  describe("Resolving which location source to use", () => {

    it("should give us Observable in any case", () => {
      let positionObservable = toTest.getPositionWatch();
      expect(positionObservable).toBeDefined();
      expect(positionObservable.subscribe).toBeDefined();
      positionObservable.subscribe((actual) => {
        expect(actual.timestamp).toBeDefined();
        expect(actual.timestamp).toBeFalsy();
      });
    });

  });

  describe("Watch management", () => {

    it("should open a watch when starting", () => {

    });

    it("should close the watch when done", () => {

    });

  });

});
