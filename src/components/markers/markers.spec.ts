import {TestBed} from "@angular/core/testing";
import {MyApp} from "../../app/app.component";
import {Platform} from "ionic-angular";
import {MarkersComponent} from "./markers";

let toTest: MarkersComponent;

/**
 * Created by jett on 9/3/17.
 */
describe("Creds Service", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyApp,
        MarkersComponent,
        Platform
      ],
      imports: [
      ]
    }).compileComponents();

    toTest = TestBed.get(MarkersComponent);

  });

  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

});
