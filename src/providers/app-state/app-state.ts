import {PositionSourceType} from "./position-source-type";

/** Defines the items that show up on the Status Page. */
export class AppState {
  registeredAs: string = "Not Yet Registered";
  isRunningBrowser: boolean = true;
  positionSource: PositionSourceType = PositionSourceType.UNDETERMINED;
  locationCount: number = 0;
  readyToEdit: boolean = false;
}

