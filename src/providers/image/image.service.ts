import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BASE_URL, HttpService} from "front-end-common";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ImageService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
  ) {}

  uploadImage(formData: FormData): Observable<any>  {
    let uploadHeaders: HttpHeaders = this.httpService.getAuthHeaders();
    uploadHeaders.append('Content-Type', undefined);
    return this.http.post<any>(
      BASE_URL + 'image/upload',
      formData,
      {headers: uploadHeaders}
    );
  }

}
