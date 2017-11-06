import {LocationTypeService} from "./loctype.service";
import {Subject} from "rxjs/Subject";
import LocationType = clueRide.LocationType;
/**
 * Created by jett on 10/29/17.
 */

let toTest: LocationTypeService;
const resourceSubject: Subject<Array<LocationType>> = new Subject();

let mockResource = {
  mock: true,
  types: function (any) {
    return resourceSubject.asObservable();
  }
};

const locType: LocationType = {
    id: 6,
    name: "Beverages to Go",
    description: "Indescribable",
    icon: "coffee"
  };

let types: Array<LocationType>;

describe("Location Type Service", () => {

  beforeEach(() => {
    resourceSubject.next([locType]);
    toTest = new LocationTypeService(
      mockResource
    );
  });

  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

  describe("hits cache when appropriate", () => {

    it("should invoke the REST API on the first call", () => {
      /* train mocks */
      spyOn(mockResource, 'types').and.returnValue(resourceSubject.asObservable());

      /* make calls */
      toTest.initializeCache();
      types = toTest.allLocationTypes();

      /* verify results */
      expect(mockResource.types).toHaveBeenCalled();
    });

    it("should invoke the cache -- and not REST API -- on subsequent call", () => {
      /* train mocks */
      spyOn(mockResource, 'types').and.returnValue(resourceSubject.asObservable());

      /* make calls */
      toTest.initializeCache();
      types = toTest.allLocationTypes();

      /* verify results */
      expect(mockResource.types).not.toHaveBeenCalled();
    });

  });

  describe("Location Types", () => {

    it("should provide Loc Type by ID", () => {
      let expected: LocationType  = locType;
      let actual = toTest.getById(locType.id);
      expect(actual).toBe(expected);
    });

    it("should return empty value if ID doesn't match", () => {
      let actual = toTest.getById(-1);
      expect(actual).toBeFalsy();
    });
  })

});
