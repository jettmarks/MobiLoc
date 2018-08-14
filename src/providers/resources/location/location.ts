import {Injectable} from "@angular/core";
import {LatLon} from "front-end-common";

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


