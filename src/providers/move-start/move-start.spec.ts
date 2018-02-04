/**
 * Created by jett on 12/5/17.
 */
import {MoveStartService} from "./move-start";
import {Subject} from "rxjs/Subject";
import {Geoposition} from "@ionic-native/geolocation";
// tslint:disable-next-line
import any = jasmine.any;

let toTest: MoveStartService;

describe("Move Start Service", () => {

  beforeEach(() => {
    toTest = new MoveStartService();
  });


  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

  describe("Auto Center", () => {

    it("should be true initially", () => {
      /* verify results */
      expect(toTest.isAutoCenter()).toBeTruthy();
    });

    it("should be false when cleared", () => {
      /* make call */
      toTest.setAutoCenter(false);

      /* verify results */
      expect(toTest.isAutoCenter()).toBeFalsy();
    });

    it("should be true when set", () => {
      /* setup data */

      /* train mocks */

      /* make call */
      toTest.setAutoCenter(false);
      toTest.setAutoCenter(true);

      /* verify results */
      expect(toTest.isAutoCenter()).toBeTruthy();
    });

    it("should be false when set, but map has moved", () => {
      /* Failed attempt to generate events that my code responds to. */
      /* setup data */
      // let map = L.map('map');
      // toTest.useMap(map);

      /* train mocks */

      /* make call */
      // document.dispatchEvent(new LeafletEvent("movestart"));

      /* verify results */
      // expect(toTest.isAutoCenter()).toBeFalsy();
    });

  });

  describe("Use Map", () => {

    it("should recognize map when set and return its center", () => {
      /* setup data */
      let map: any = {
        getCenter: () => {},
        on: () => {}
      };
      let centerSubject: Subject<Geoposition> = new Subject;
      let actual: any;
      let expected: any = {lat: 50, lng: 30};

      /* train mocks */
      spyOn(map, "getCenter").and.callFake(() => {
        return expected;
      });

      /* make call */
      toTest.useMap(
        map,
        centerSubject
      );

      /* verify results */
      centerSubject.asObservable().subscribe(
        (response) => {
          actual = response;
          expect(actual).toEqual(expected);
        }
      );

    });

  });

});
