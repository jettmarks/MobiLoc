/**
 * Created by jett on 11/5/17.
 */

import {Inject, Injectable} from "@angular/core";
import {IMAGE_REST} from "./image.service.provider";

@Injectable()
export class ImageService {

  constructor(
    @Inject(IMAGE_REST) private resource
  ) {
  }

  uploadImage(params: any) {
    return this.resource.uploadImage(params);
  }

}

