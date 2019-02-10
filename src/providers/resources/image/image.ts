import {Location} from "../location/location";

/**
 * Created by jett on 11/5/17.
 */

  export class Image {
    lat: number;
    lon: number;
    locationId: number;
    fileData: FormData;

    public populateFromLocation(location: Location) {
      this.locationId = location.id;
      this.lat = location.latLon.lat;
      this.lon = location.latLon.lon;
    }

    public addImageData(imageData: string) {
      this.fileData = new FormData();
      this.fileData.append("file", imageData, "cameraImage.jpg");
    }

  }
