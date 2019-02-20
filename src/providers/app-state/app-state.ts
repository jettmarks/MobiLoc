import {LocationSourceType} from "./location-source-type";

/** Defines the items that show up on the Status Page. */
export class AppState {
  registeredAs: string = "Not Yet Registered";
  isRunningBrowser: boolean = true;
  locationSource: LocationSourceType = LocationSourceType.UNDETERMINED;
  locationCount: number = 0;
  readyToEdit: boolean = false;
}

