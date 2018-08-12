import {LatLon} from "../../lat-lon/lat-lon";
import {Injectable} from "@angular/core";

/**
 * Created by jett on 7/10/17.
 */
@Injectable()
export class Location {

  id: number;
  nodeId: number;   // Provides Lat/Lon
  latLon: LatLon;
  name?: string;
  description?: string;
  locationGroupId?: number;
  locationTypeName?: string;
  locationTypeId: number;
  featuredImageUrl?: string;
  establishmentId?: number;
  readinessLevel: string;
}


