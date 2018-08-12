import {Component, Injectable} from "@angular/core";
import * as L from "leaflet";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers";
import {CRMarker} from "./crMarker";
import {Location} from "../../providers/resources/location/location";
import MarkerOptions = L.MarkerOptions;

/**
 * Component for providing Markers and marker services.
 */
@Injectable()
@Component({
  selector: 'markers',
  templateUrl: 'markers.html',
})
export class MarkersComponent {

  private attractionIcon: L.AwesomeMarkers.Icon;
  private featuredIcon: L.AwesomeMarkers.Icon;
  private issueIcon: L.AwesomeMarkers.Icon;
  private placeIcon: L.AwesomeMarkers.Icon;
  private unknownIcon: L.AwesomeMarkers.Icon;

  constructor( ) {
    this.attractionIcon = L.AwesomeMarkers.icon({
      icon: 'exclamation',
      markerColor: 'blue',
      prefix: "fa"
    });

    this.featuredIcon = L.AwesomeMarkers.icon({
      icon: 'exclamation',
      markerColor: 'purple',
      prefix: "fa"
    });

    this.issueIcon = L.AwesomeMarkers.icon({
      icon: 'exclamation',
      markerColor: 'red',
      prefix: "fa"
    });

    this.placeIcon = L.AwesomeMarkers.icon({
      icon: 'exclamation',
      markerColor: 'green',
      prefix: "fa"
    });

    this.unknownIcon = L.AwesomeMarkers.icon({
      icon: 'question',
      markerColor: 'darkred',
      prefix: "fa"
    });

  }

  public getLocationMarker(
    location: Location,
    iconName: string
  ): CRMarker {
    let markerOptions: MarkerOptions = {
      icon: this.getLocationMarkerIcon(location.readinessLevel, iconName),
      alt: "locId:"+location.id,
      title: location.name + " : " + location.id
    };
    let clueRideMarker: CRMarker = new CRMarker(location, markerOptions);
    clueRideMarker.locationId = location.id;
    return clueRideMarker;
  }

  /**
   * Prepares a Font Awesome Marker of the requested icon and color.
   */
  private static getFontAwesomeMarker(
    iconName: string,
    markerColor: any
  ): L.AwesomeMarkers.Icon {
    return L.AwesomeMarkers.icon({
      icon: iconName,
      markerColor: markerColor,
      prefix: "fa"
    });
  }

  private static getDraftUsingIcon(
    iconName: string
  ): L.AwesomeMarkers.Icon {
     return MarkersComponent.getFontAwesomeMarker(iconName, 'orange');
  }

  private static getPlaceUsingIcon(
    iconName: string
  ): L.AwesomeMarkers.Icon {
    return MarkersComponent.getFontAwesomeMarker(iconName, 'green');
  }

  private getLocationMarkerIcon(
    readinessLevel: string,
    iconName: string,
  ): L.AwesomeMarkers.Icon {
    switch(readinessLevel.toUpperCase()) {
      case 'ISSUE':
        return this.issueIcon;
      case 'DRAFT':
        return MarkersComponent.getDraftUsingIcon(iconName);
      case 'PLACE':
        return MarkersComponent.getPlaceUsingIcon(iconName);
      case 'ATTRACTION':
        return MarkersComponent.getFontAwesomeMarker(iconName, 'blue');
      case 'FEATURED':
        return this.featuredIcon;
      case 'NODE':
      default:
        return this.unknownIcon;
    }
  }

}
