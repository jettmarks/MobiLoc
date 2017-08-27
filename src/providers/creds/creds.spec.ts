import {Creds} from "./creds.service";
import {TestBed} from "@angular/core/testing";
import {Platform} from "ionic-angular";
import {IonicStorageModule} from "@ionic/storage";
import {MyApp} from "../../app/app.component";

let toTest: Creds;
let validToken: string = "eyJhbGciOiJIUzI1NiIsImJhZGdlcyI6WyJMT0NBVElPTl9FRElUT1IiXSwiZW1haWwiOiJndWVzdC5kdW1teUBjbHVlcmlkZS5jb20iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJjbHVlcmlkZS5jb20iLCJqdGkiOiJ2NGY1MDBvNWw0dHB1N2I4NXNtc2RlNjdlOCJ9.mknl-JguS5TbT-HJ0-2zotOWEVkXF_JstFiXPIZvPQ8";
let guestToken: string = "eyJiYWRnZXMiOlsiTE9DQVRJT05fRURJVE9SIl0sImd1ZXN0Ijp0cnVlLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImVtYWlsIjoiZ3Vlc3QuZHVtbXlAY2x1ZXJpZGUuY29tIn0.eyJpc3MiOiJjbHVlcmlkZS5jb20iLCJqdGkiOiJsbXFoM2xlaWxkbGtzNWZjczRtdG83ZjY4YSJ9.hNVmfihrc5iEUzmM8mnnRa4SH27kAvJIzEADIXsEQlk";

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

  describe("synchronous token parsing", () => {

    it("should immediately parse valid token to set logged-in payload values", (done) => {
      /* set up */
      let promise = toTest.setAuthToken(validToken);
      /* make call and verify */
      expect(toTest.hasToken()).toBeTruthy();
      expect(toTest.isGuest()).toBeFalsy();
      expect(toTest.isLoggedIn()).toBeTruthy();

      /* wait for resolution */
      promise.then(
        () => {
          done();
        }
      );
    });

    it("should immediately parse guest token to set guest payload values", (done) => {
      /* set up */
      let promise = toTest.setAuthToken(guestToken);

      /* make call and verify */
      expect(toTest.hasToken()).toBeTruthy();
      expect(toTest.isGuest()).toBeTruthy();
      expect(toTest.isLoggedIn()).toBeFalsy();

      /* wait for resolution */
      promise.then(
        () => {
          done();
        }
      );
    });

  });
  describe("Token Storage and Retrieval", () => {
    it("should report absence of token", () => {
      /* make call */
      let actual = toTest.hasToken();
      /* verify results */
      expect(actual).toBeFalsy();
    });

    it("should report presence of token", (done) => {
      /* set up */
      toTest.setAuthToken(
        validToken
      ).then(
        () => {
          return toTest.loadToken();
        }
      ).then(
        /* make call and verify results */
        () => {
          expect(toTest.hasToken()).toBeTruthy();
          done();
        }
      );
    });

    it("should report Guest Token", (done) => {
      /* set up */
      toTest.setAuthToken(
        guestToken
      ).then(
        () => {
          return toTest.loadToken();
        }
      ).then(
        /* make call and verify results */
        () => {
          expect(toTest.isGuest()).toBeTruthy();
          expect(toTest.hasToken()).toBeTruthy();
          done();
        }
      );
    });

    it("should report Full authenticated token", (done) => {
      /* set up */
      toTest.setAuthToken(
        validToken
      ).then(
        () => {
          return toTest.loadToken();
        }
      ).then(
        () => {
          /* verify results */
          expect(toTest.isGuest()).toBeFalsy();
          expect(toTest.hasToken()).toBeTruthy();
          done();
        }
      );
    });

    it("should treat initial empty token gracefully", (done) => {
      toTest.clear().then(
        () => {
          toTest.loadToken().then(
            (payload) => {
              expect(payload).toBeDefined();
              expect(toTest.isGuest()).toBeTruthy();
              expect(toTest.getPrincipalName()).toBe("guest.dummy@clueride.com");
              done();
            }
          );
        }
      );
    });

  });

  describe("Needs Auth Token", () => {

    it("should report no Auth Token for new sessions", (done) => {
      toTest.clear().then(
        () => {
          toTest.loadToken().then(
            () => {
              expect(toTest.hasToken()).toBeFalsy();
              done();
            }
          );
        }
      );
    });

    it("should report Auth Token for guest sessions", (done) => {
      toTest.setAuthToken(
        guestToken
      ).then(
        () => {
          toTest.loadToken().then(
            () => {
              expect(toTest.hasToken()).toBeTruthy();
              done();
            }
          );
        }
      );
    });

    it("should report Auth Token for valid sessions", (done) => {
      toTest.setAuthToken(
        validToken
      ).then(
        () => {
          toTest.loadToken().then(
            () => {
              expect(toTest.hasToken()).toBeTruthy();
              done();
            }
          );
        }
      );
    });

  });

  describe("Login/Logout", () => {

    it("should allow logging in for new users", (done) => {
      toTest.clear().then(
        () => {
          toTest.loadToken().then(
            () => {
              expect(toTest.isLoggedIn()).toBeFalsy();
              done();
            }
          );
        }
      );
    });

    it("should allow logging in for guest users", (done) => {
      toTest.setAuthToken(
        guestToken
      ).then(
        () => {
          toTest.loadToken().then(
            () => {
              expect(toTest.isLoggedIn()).toBeFalsy();
              done();
            }
          );
        }
      );
    });

    it("should not allow logging in for authenticated sessions", (done) => {
      toTest.setAuthToken(
        validToken
      ).then(
        () => {
          toTest.loadToken().then(
            () => {
              expect(toTest.isLoggedIn()).toBeTruthy();
              done();
            }
          );
        }
      );
    });

  });

  describe("Token Parsing", () => {
    it("should pickup Principal Name", (done) => {
      /* set up */
      let expected = "guest.dummy@clueride.com";
      toTest.setAuthToken(
        validToken
      ).then(
        () => {
          toTest.loadToken().then(
            () => {
              /* make call */
              let actual = toTest.getPrincipalName();
              /* verify results */
              expect(actual).toBeDefined();
              expect(actual).toBe(expected);
              done();
            }
          );
        }
      );
    });

    it("should pickup Badges", (done) => {
      /* set up */
      let expected = ["LOCATION_EDITOR"];
      toTest.setAuthToken(
        validToken
      ).then(
        () => {
          /* make call */
          let actual = toTest.getBadges();
          /* verify results */
          expect(actual).toBeDefined();
          expect(actual.length).toBe(expected.length);
          expect(actual[0]).toBe(expected[0]);
          done();
        }
      );
    });

  });
});
