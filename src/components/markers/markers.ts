import {Component, Injectable} from "@angular/core";
import * as L from "leaflet";
import {icon, marker} from "leaflet";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers";
import {CRMarker} from "./crMarker";
import PointExpression = L.PointExpression;
import MarkerOptions = L.MarkerOptions;

/**
 * Component for providing Markers and marker services.
 */
@Injectable()
@Component({
  selector: 'markers',
  templateUrl: 'markers.html'
})
export class MarkersComponent {

  private hereIAmIcon: L.Icon;
  private hereIAmHeadingIcon: L.Icon;
  private hereIAmTetheredIcon: L.Icon;
  private hereIAmHeadingTetheredIcon: L.Icon;
  private headingMarker: any;
  private deviceHasCompass: boolean;

  /** Marker size and anchor are common across all images. */
  static readonly commonIconSize: PointExpression = [20, 50];
  static readonly commonIconAnchor: PointExpression = [10, 25];

  private attractionIcon: L.AwesomeMarkers.Icon;
  private draftIcon: L.AwesomeMarkers.Icon;
  private featuredIcon: L.AwesomeMarkers.Icon;
  private issueIcon: L.AwesomeMarkers.Icon;
  private placeIcon: L.AwesomeMarkers.Icon;

  constructor()
  {
    /* This may be happening too early (LE-19). */
    this.deviceHasCompass = !!navigator.compass;
    console.log('Hello MarkersComponent Component: has ' + (this.deviceHasCompass ? '' : ' no ') + 'compass');

    /**
     * This particular icon is used to show direction the device is facing.
     * See README.md for more details.
     * @type {L.Icon}
     */
    this.hereIAmIcon = this.iconFromImage(
      "https://www.clueride.com/wp-content/uploads/2017/07/hereIAm.png",
    );

    this.hereIAmHeadingIcon = this.iconFromImage(
      "https://www.clueride.com/wp-content/uploads/2017/07/hereIAm-heading.png",
    );

    this.hereIAmTetheredIcon = this.iconFromImage(
      "https://www.clueride.com/wp-content/uploads/2017/07/hereIAm-tethered.png",
    );

    this.hereIAmHeadingTetheredIcon = this.iconFromImage(
      "https://www.clueride.com/wp-content/uploads/2017/07/hereIAm-heading-tethered.png",
    );

    this.attractionIcon = L.AwesomeMarkers.icon({
      icon: 'exclamation',
      markerColor: 'blue',
      prefix: "fa"
    });

    this.draftIcon = L.AwesomeMarkers.icon({
      icon: 'exclamation',
      markerColor: 'orange',
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
  }

  private iconFromImage(iconUrl: string): L.Icon {
    return icon({
      iconUrl: iconUrl,
      iconSize: MarkersComponent.commonIconSize,
      iconAnchor: MarkersComponent.commonIconAnchor
    });
  }

  /**
   * Lazy-init for a "Here I Am" Marker.
   *
   * Learned that this marker implementation will create the '_icon' property only if we provide the
   * rotationAngle and rotationOrigin arguments to the constructor.  We need that '_icon' property since that
   * is our access to the CSS style object we use to rotate the image.
   *
   * @returns L.Marker at the given position.
   */
  public getHereIAmMarker(position) {
    if (!this.headingMarker) {
      if (this.deviceHasCompass) {
        this.headingMarker = marker(
          position,
          <any>{
            icon: this.hereIAmHeadingIcon,
            rotationAngle: 0.0,
            rotationOrigin: 'center center'
          }
        );
      } else {
        this.headingMarker = marker(
          position,
          {
            icon: this.hereIAmIcon
          }
        );
      }
    }
    return this.headingMarker;
  }

  public updateHeadingMarkerLocation(p) {
    if (p) {
      this.headingMarker.setLatLng([
        p.latitude,
        p.longitude
      ]);
    }
  }

  /**
   * Given a Compass Heading, set the heading of the icon.
   *
   * This implementation uses CSS on the marker's icon instance to add the rotateZ() transform.
   * @param compassHeading CompassHeading object whose 'trueHeading' property provides a heading in degrees from
   * north: (N: 0, E: 90, S: 180, W:270).
   */
  public updateHeadingMarkerHeading(compassHeading: CompassHeading) {
    let newHeading = 0.0;
    if(compassHeading.trueHeading) {
      newHeading = compassHeading.trueHeading;
    }
    /* TODO: Race condition means this may not yet be defined */
    if (this.headingMarker._icon) {
      this.headingMarker._icon.style['transformOrigin'] = 'center center';
      this.headingMarker._icon.style['transform'] += ' rotateZ(' + newHeading + 'deg)';
    }
  }

  /**
   * Given a set of coordinates, update the Marker.
   * @param coordinates
   */
  updateCurrentLocationMarker(coordinates: string | L.Point | Coordinates) {
    /* While updating the location of the marker ... */
    this.updateHeadingMarkerLocation(coordinates);

    /* ... good time to update the compass heading too. */
    if (this.deviceHasCompass) {
      this.pollForHeadingUpdate();
    }
  }

  private pollForHeadingUpdate() {
    navigator.compass.getCurrentHeading(
      (heading: CompassHeading) => {    // success
        this.updateHeadingMarkerHeading(heading);
      },
      (error) => {                      // failure
        console.log("Problem reading heading: " + error);
      }
    );
  }

  public getLocationMarker(location: clueRide.Location): CRMarker {
    let markerOptions: MarkerOptions = {
      icon: this.getLocationMarkerIcon(location.readinessLevel)
    };
    let clueRideMarker: CRMarker = new CRMarker(location, markerOptions);
    clueRideMarker.locationId = location.id;
    return clueRideMarker;
  }

  private getLocationMarkerIcon(readinessLevel: string): L.AwesomeMarkers.Icon {
    switch(readinessLevel.toUpperCase()) {
      case 'ISSUE':
        return this.issueIcon;
      case 'DRAFT':
        return this.draftIcon;
      case 'PLACE':
        return this.placeIcon;
      case 'ATTRACTION':
        return this.attractionIcon;
      case 'FEATURED':
        return this.featuredIcon;
      case 'NODE':
      default:
        return null;
    }
  }

}
