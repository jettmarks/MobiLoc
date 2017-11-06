import {ImageCapturePage} from "./image-capture";
import {TestBed} from "@angular/core/testing";
import {MyApp} from "../../app/app.component";
import {NavParams, Platform} from "ionic-angular";
import {Camera} from "@ionic-native/camera";
/**
 * Created by jett on 11/5/17.
 */

let toTest: ImageCapturePage;

const location: clueRide.Location = {
  id: 13,
  nodeId: 13,
  latLon: {
    id: 13,
    lat: 33.77,
    lon: -84.37,
    lng: -84.37,
  },
  locationTypeId: 0,
  readinessLevel: "DRAFT"
};

class MockNavParams {
  data = {
    location: location
  };

  get(param) {
    return this.data[param];
  }
}

describe("Image Capture", () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        Camera,
        MyApp,
        {provide: NavParams, useClass: MockNavParams},
        ImageCapturePage,
        Platform
      ],
      imports: [
      ]
    }).compileComponents();

    toTest = TestBed.get(ImageCapturePage);
  });

  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

  describe("haveImagesToShow", () => {

    it("should be false when list is empty", () => {
      expect(toTest.haveImagesToShow()).toBe(false);
    });

    it("should be true when list is not empty", () => {
      toTest.images.unshift({src: "Test Data"});
      expect(toTest.haveImagesToShow()).toBe(true);
    })

  });

  describe("save", () => {

    it("should reply OK after a save", () => {
      toTest.save();
    });

  })

});
