import {Component, Injectable} from "@angular/core";
import * as L from "leaflet";
import {icon, marker} from "leaflet";
// import "leaflet.awesome-markers";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers";
import PointExpression = L.PointExpression;
import MarkerOptions = L.MarkerOptions;

import LIcon = L.Icon;

/**
 * Component for providing Markers and marker services.
 */
@Injectable()
@Component({
  selector: 'markers',
  templateUrl: 'markers.html'
})
export class MarkersComponent {

  private hereIAmIcon: LIcon;
  private hereIAmHeadingIcon: LIcon;
  private hereIAmTetheredIcon: LIcon;
  private hereIAmHeadingTetheredIcon: LIcon;
  private headingMarker: any;
  private deviceHasCompass: boolean;

  /** Marker size and anchor are common across all images. */
  static readonly commonIconSize: PointExpression = [20, 50];
  static readonly commonIconAnchor: PointExpression = [10, 25];

  private issueIcon: L.AwesomeMarkers.Icon;

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

    // L.AwesomeMarkers.Icon.prototype.options.prefix = 'ion';
    this.issueIcon = L.AwesomeMarkers.icon({
      icon: 'heart-broken',    /* Heart with a crack */
      markerColor: 'red',
      prefix: "fa"
    });
  }

  private iconFromImage(iconUrl: string): LIcon {
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

  public getLocationMarker(location: clueRide.Location) {
    let markerOptions: MarkerOptions = {
      icon: this.getLocationMarkerIcon(location.readiness)
    };
    return marker(location.point, markerOptions);
  }

  private getLocationMarkerIcon(readiness: clueRide.Level): L.AwesomeMarkers.Icon {
    /* TODO: Temp workaround */
    if (!readiness) return this.issueIcon;

    switch(readiness.name.toUpperCase()) {
      case 'ISSUE':
      case 'NODE':
      default:
        return this.issueIcon;
    }

  }
}
