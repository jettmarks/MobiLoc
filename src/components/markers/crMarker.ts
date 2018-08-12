import {Marker, MarkerOptions} from "leaflet";
import {Location} from "../../providers/resources/location/location";

/**
 * Created by jett on 9/8/17.
 * Extends the Leaflet Marker with a ClueRide.Location ID so any marker events will carry the ID of
 * the location the marker represents.
 */
export class CRMarker extends Marker {
  locationId: number;

  constructor(
    location: Location,
    options: MarkerOptions,
  ) {
    super(location.latLon, options);
    this.locationId = location.id;
  }
}
