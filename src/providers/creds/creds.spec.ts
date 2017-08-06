import {Creds} from "./creds.service";
import {TestBed} from "@angular/core/testing";
import {Platform} from "ionic-angular";
import {IonicStorageModule} from "@ionic/storage";
import {MyApp} from "../../app/app.component";
import Expected = jasmine.Expected;
import any = jasmine.any;

let toTest: Creds;
let validToken: string = "eyJhbGciOiJIUzI1NiIsImJhZGdlcyI6WyJMT0NBVElPTl9FRElUT1IiXSwiZW1haWwiOiJndWVzdC5kdW1teUBjbHVlcmlkZS5jb20iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJjbHVlcmlkZS5jb20iLCJqdGkiOiJ2NGY1MDBvNWw0dHB1N2I4NXNtc2RlNjdlOCJ9.mknl-JguS5TbT-HJ0-2zotOWEVkXF_JstFiXPIZvPQ8";

describe("Creds Service", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyApp,
        Creds,
        Platform
      ],
      imports: [
        IonicStorageModule.forRoot(MyApp),
      ]
    }).compileComponents();

    toTest = TestBed.get(Creds);

  });

  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

  describe("Token Parsing", () => {
    it("should pickup Principal Name", () => {
      /* set up */
      let expected = "guest.dummy@clueride.com";
      toTest.setAuthToken(validToken);
      /* make call */
      let actual = toTest.getPrincipalName();
      /* verify results */
      expect(actual).toBeDefined();
      expect(actual).toBe(expected);
    });

    it("should pickup Badges", () => {
      /* set up */
      let expected = ["LOCATION_EDITOR"];
      toTest.setAuthToken(validToken);
      /* make call */
      let actual = toTest.getBadges();
      /* verify results */
      expect(actual).toBeDefined();
      expect(actual.length).toBe(expected.length);
      expect(actual[0]).toBe(expected[0]);
    });

  });
});
