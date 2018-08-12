import {LatLonComponent} from "./lat-lon";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Platform} from "ionic-angular";
import {GeoLocService} from "../../providers/geo-loc/geo-loc";
import {DeviceGeoLocService} from "../../providers/device-geo-loc/device-geo-loc.service";
import {RestangularModule} from "ngx-restangular";
import {Subject} from "rxjs/Subject";
import {Geoposition} from "@ionic-native/geolocation";
import * as L from "leaflet";

let toTest: LatLonComponent;
let fixture: ComponentFixture<LatLonComponent>;

describe("Lat-Lon Component", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LatLonComponent
      ],
      imports: [
        RestangularModule
      ],
      providers: [
        DeviceGeoLocService,
        GeoLocService,
        Platform,
      ]
    });
    fixture = TestBed.createComponent(LatLonComponent);
    toTest = fixture.componentInstance;
  });

  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

  describe("set subject", () => {

    it("should begin setting content once the subject provides positions", () => {
      /* setup data */
      let expected = GeoLocService.DEFAULT_GEOPOSITION;
      let positionSubject: Subject<Geoposition> = new Subject;
      let mockContainer = {
        innerHtml: {}
      }

      /* train mocks */
      spyOn(toTest, "getContainer").and.returnValue(mockContainer);

      /* make call */
      toTest.setPositionSubject(positionSubject);
      positionSubject.next(expected);

      /* verify results */
      expect(toTest.getContainer).toHaveBeenCalled();
      // expect(mockContainer.innerHtml).toEqual('LatLon: 34.780000, -84.380000');

    });

  });

  describe("enable display", () => {

    it("should set inner HTML to blank when disabled", () => {
      /* setup data */
      let expected = GeoLocService.DEFAULT_GEOPOSITION;
      let positionSubject: Subject<Geoposition> = new Subject;
      let mockContainer = {
        innerHtml: {}
      }

      /* train mocks */
      spyOn(toTest, "getContainer").and.returnValue(mockContainer);

      /* make call */
      toTest.enableDisplay(false);
      toTest.setPositionSubject(positionSubject);
      positionSubject.next(expected);

      /* verify results */
      expect(toTest.getContainer).toHaveBeenCalled();

    });

  });

  describe("on Add", () => {

    it("should create DOM element when added to the map", () => {
      let map: any = {
        bottomleft: {}
      };

      /* train mocks */
      spyOn(L.DomUtil, "create").and.returnValue("don't care");

      /* make call */
      toTest.onAdd(map);

      /* verify results */
      expect(L.DomUtil.create).toHaveBeenCalled();

    });
  });

});
