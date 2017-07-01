import {Component, Injectable} from '@angular/core';

/**
 * Component for providing Markers and marker services.
 */
@Injectable()
@Component({
  selector: 'markers',
  templateUrl: 'markers.html'
})
export class MarkersComponent {

  private headingIcon: L.Icon;
  private headingMarker: any;
  private deviceHasCompass: boolean;

  constructor()
  {
    this.deviceHasCompass = !!navigator.compass;
    console.log('Hello MarkersComponent Component: has ' + (this.deviceHasCompass ? '' : ' no ') + 'compass');

    /**
     * Tight coupling with the image being used as a marker.
     * This particular icon is used to show direction the device is facing.
     * @type {L.Icon}
     */
    this.headingIcon = L.icon({
      iconUrl: "https://www.clueride.com/wp-content/uploads/2017/06/heading-marker.png",
      // iconUrl: "/assets/markers/heading-marker.png",
      iconSize: [64, 64],
      iconAnchor: [32, 32]
    });

    /**
     * TODO: Want Icons for
     * <li>Location without heading.
     * <li>tethered location.
     */
  }

  /**
   * Lazy-init for a Heading Marker.
   *
   * Learned that this marker implementation will create the '_icon' property only if we provide the
   * rotationAngle and rotationOrigin arguments to the constructor.  We need that '_icon' property since that
   * is our access to the CSS style object we use to rotate the image.
   *
   * @returns L.Marker at the given position.
   */
  public getHeadingMarker(position) {
    if (!this.headingMarker) {
      this.headingMarker = L.marker(
        position,
        <any>{
          icon: this.headingIcon,
          rotationAngle: 0.0,
          rotationOrigin: 'center center'
        }
      );
      this.updateHeadingMarkerHeading(position);
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
