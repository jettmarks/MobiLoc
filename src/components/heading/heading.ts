import {Component, Injectable} from "@angular/core";
import {icon, marker, PointExpression} from "leaflet";
import {Platform} from "ionic-angular";
import {
  DeviceOrientation,
  DeviceOrientationCompassHeading,
  DeviceOrientationCompassOptions
} from "@ionic-native/device-orientation";
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "front-end-common";

/**
 * Generated class for the HeadingComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

/** Marker size and anchor are common across all images. */
const commonIconSize: PointExpression = [20, 50];
const commonIconAnchor: PointExpression = [10, 25];

const headingOptions: DeviceOrientationCompassOptions = {
  frequency: 800
};

@Injectable()
@Component({
  selector: 'heading',
  template: ''
})
export class HeadingComponent {
  subscription: Subscription;
  deviceHasCompass: boolean;

  private hereIAmIcon: L.Icon;
  private hereIAmHeadingIcon: L.Icon;
  private hereIAmTetheredIcon: L.Icon;
  private hereIAmHeadingTetheredIcon: L.Icon;
  private headingMarker: any;
  private lastHeading: number;

  constructor(
    private deviceOrientation: DeviceOrientation,
    private platform: Platform,
    private authService: AuthService,
  ) {

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

  ngOnInit() {
    console.log("HeadingComponent: ngOnInit()");
    this.platform.ready().then(
      () => {
        console.log("HeadingComponent: Platform Ready");
        this.checkCompassAvailability();
      }
    );

  }

  /**
   * We find out if we have a compass by attempting to get a reading.
   *
   * This is exposed as public for testing reasons: it's not easy
   * to mock the platform ready which is when the check can be performed.
   */
  public checkCompassAvailability(): void {
    this.deviceHasCompass = false;
    if (!this.authService.runningLocal()) {
      this.deviceOrientation.getCurrentHeading().then(
        (data: DeviceOrientationCompassHeading) => {
          this.deviceHasCompass = true;
          this.lastHeading = data.trueHeading;
        }
      ).catch(
        (error) => {
          console.log("Ionic Native not available: " + error);
        }
      );
    } else {
      console.log("Heading Component: Ionic Native not available in Local");
    }
  }

  private iconFromImage(iconUrl: string): L.Icon {
    return icon({
      iconUrl: iconUrl,
      iconSize: commonIconSize,
      iconAnchor: commonIconAnchor
    });
  }

  public getHeadingMarker(): L.Marker {
    let position = [0.0, 0.0];
    if (!this.headingMarker) {
      this.setupHeadingMarker(position);
    }
    this.addHeadingSubscription();
    return this.headingMarker;
  }

  private setupHeadingMarker(
    position,
  ) {
    this.reportCompass();
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

  private reportCompass() {
    if (this.deviceHasCompass) {
      console.log("Device has a compass")
    } else {
      console.log("Device has no compass")
    }
  }

  private addHeadingSubscription() {
    if (this.deviceHasCompass) {
      console.log("Adding Subscription to Compass Heading")
      this.subscription = this.deviceOrientation.watchHeading(headingOptions).subscribe(
        (data: DeviceOrientationCompassHeading) => this.updateHeadingMarkerHeading(data)
      );
    }
  }

  /**
   * Given a Compass Heading, set the heading of the icon.
   *
   * @param compassHeading CompassHeading object whose 'trueHeading' property provides a heading in degrees from
   * north: (N: 0, E: 90, S: 180, W:270).
   */
  private updateHeadingMarkerHeading(compassHeading: DeviceOrientationCompassHeading) {
    if(compassHeading.trueHeading) {
      this.lastHeading = compassHeading.trueHeading;
    }
  }

  /**
   * Given a set of coordinates, update the location of the Marker.
   * Since we're changing the CSS on the marker, it's a good time to
   * reflect the orientation of the marker as well.
   * @param coordinates
   */
  public updateLocation(coordinates: string | L.Point | Coordinates) {
    console.log("Heading.updateLocation() invoked");
    /* While updating the location of the marker ... */
    this.updateHeadingMarkerLocation(coordinates);
    if (this.deviceHasCompass) {
      this.renderMarkerHeading();
    }
  }

  /**
   * This implementation uses CSS on the marker's icon instance to add the rotateZ() transform.
   */
  private renderMarkerHeading() {
    if (this.headingMarker._icon) {
      this.headingMarker._icon.style['transformOrigin'] = 'center center';
      this.headingMarker._icon.style['transform'] += ' rotateZ(' + this.lastHeading + 'deg)';
    }
  }

  private updateHeadingMarkerLocation(p) {
    if (p) {
      this.headingMarker.setLatLng([
        p.latitude,
        p.longitude
      ]);
    }
  }

  ngOnDestroy() {
    this.releaseHeadingMarker();
  }

  /**
   * When closing the map, the marker should be shutdown -- including
   * its subscription to the compass.
   */
  public releaseHeadingMarker() {
    if (this.deviceHasCompass && this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
