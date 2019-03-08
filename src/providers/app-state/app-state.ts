import {PositionSourceType} from "./position-source-type";

/** Defines the items that show up on the Status Page. */
export class AppState {
  registeredAs: string = " ... ";
  registrationState: string = "";
  isRunningBrowser: boolean = true;
  positionSource: PositionSourceType = PositionSourceType.UNDETERMINED;
  cacheState: string = " ... ";
  locationCount: number = 0;
  readyToEdit: boolean = false;
}

