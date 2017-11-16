import {ImageCapturePage} from "./image-capture";
import {TestBed} from "@angular/core/testing";
import {IonicModule, NavParams} from "ionic-angular";
import {Camera} from "@ionic-native/camera";
import {RestangularModule} from "ngx-restangular";
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
      declarations: [
        ImageCapturePage
      ],
      imports: [
        IonicModule.forRoot(ImageCapturePage),
        RestangularModule
      ],
      providers: [
        Camera,
        {provide: NavParams, useClass: MockNavParams},
        ImageCapturePage,
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
      /* setup data */

      /* train mocks */
      toTest.fakeImage();

      /* make call */
      toTest.save();

      /* verify results */

    });


    it("should redirect to loc edit tab after save completes", () => {
      /* setup data */

      /* train mocks */

      /* make call */

      /* verify results */

    });

  })

});
