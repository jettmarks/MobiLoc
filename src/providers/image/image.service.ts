import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BASE_URL, HttpService, Image, Location} from "front-end-common";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ImageService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
  ) {}

  /**
   * Create a New Image record.
   * @param formData contains the data about which Location this is being attached to.
   */
  uploadImage(formData: FormData): Observable<any>  {
    let uploadHeaders: HttpHeaders = this.httpService.getAuthHeaders();
    uploadHeaders.append('Content-Type', undefined);
    return this.http.post<any>(
      BASE_URL + 'image/upload',
      formData,
      {headers: uploadHeaders}
    );
  }

  /**
   * Returns the server's idea of whether the given location has
   * more than one image.
   * @param locationId Unique ID for the Location.
   */
  hasMultipleImages(locationId: number): Observable<boolean> {
    let uploadHeaders: HttpHeaders = this.httpService.getAuthHeaders();
    return this.http.get<boolean>(
      BASE_URL + 'image/multi-image/' + locationId,
      {headers: uploadHeaders}
    );
  }

  /**
   * Returns a list of Images for the given Location.
   * @param locationId unique identifier for the Location.
   */
  getAllImagesForLocation(locationId: number): Observable<Image[]> {
    let uploadHeaders: HttpHeaders = this.httpService.getAuthHeaders();
    return this.http.get<Image[]>(
      BASE_URL + 'image/' + locationId,
      {headers: uploadHeaders}
    );
  }

  /**
   * Sets the Featured Image for the given Location to the given Image.
   * @param locationId
   * @param imageId
   */
  setFeaturedImage(
    locationId: number,
    imageId: number
  ): Observable<Location> {
    let uploadHeaders: HttpHeaders = this.httpService.getAuthHeaders();
    return this.http.put<Location>(
      BASE_URL + 'location/featured/' + locationId + '/' + imageId,
      {},
      {headers: uploadHeaders}
    );
  }

}
