/**
 * Created by jett on 7/10/17.
 */
namespace clueRide {
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

  /**
   * How we place this on the Map.
   */
  export class LatLon {
    id: number;
    // May want one of the geographical types understood by leaflet
    lat: number;
    lon: number;
    lng: number;
  }

}
