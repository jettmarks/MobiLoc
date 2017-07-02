import {Component, Injectable} from '@angular/core';
import PointExpression = L.PointExpression;

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

  }

  private iconFromImage(iconUrl: string): L.Icon {
    return L.icon({
      iconUrl: iconUrl,
      // iconUrl: "/assets/markers/hearIAm-heading.png",
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
        this.headingMarker = L.marker(
          position,
          <any>{
            icon: this.hereIAmHeadingIcon,
            rotationAngle: 0.0,
            rotationOrigin: 'center center'
          }
        );
      } else {
        this.headingMarker = L.marker(
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

}
