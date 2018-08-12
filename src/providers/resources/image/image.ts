import {Location} from "../location/location";

/**
 * Created by jett on 11/5/17.
 */

  export class Image {
    lat: number;
    lon: number;
    locId: number;
    file: FormData;

    public populateFromLocation(location: Location) {
      this.locId = location.id;
      this.lat = location.latLon.lat;
      this.lon = location.latLon.lon;
    }

    public addImageData(imageData: string) {
      this.file = new FormData();
      this.file.append("file", imageData, "cameraImage.jpg");
    }

  }
