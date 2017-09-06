/**
 * Created by jett on 7/10/17.
 */
namespace clueRide {
  export class Location {

    id: number;
    nodeId: number;   // Provides Lat/Lon
    point: Node;
    name?: string;
    description?: string;
    locationGroupId?: number;
    locationType?: LocationType;
    clueIds?: number[];
    featuredImageUrl?: string;
    imageUrls?: string[];
    establishmentId?: number;
    tagScores?: TagScores;
    readinessLevel: string;
  }

  /**
   * How we place this on the Map.
   */
  export class Node {
    id: number;
    // May want one of the geographical types understood by leaflet
    lat: number;
    lon: number;
    lng: number;
  }

  /**
   * Shell class at this time, but expected to contain a map of tags to scores.
   */
  export class TagScores {

  }

  export class LocationType {
    // At this time, the enumeration of Location Types is maintained on the server
    // (in preparation to move to a DB table)
  }

}
