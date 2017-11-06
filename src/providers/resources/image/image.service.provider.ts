import {InjectionToken} from "@angular/core";
import {Restangular} from "ngx-restangular";
import {Resource} from "../resource";
/**
 * Created by jett on 11/5/17.
 */
export const IMAGE_REST = new InjectionToken<string>('ImageResource');

const UPLOAD_IMAGE =
  {
    resourceName: 'location',
    name: 'uploadImage',
    httpMethod: 'post',
    path: 'uploadImage',
    object: {
      locId: 0,
      lat: 33.77,
      lon: -84.37,
      file: ""
    },
    headers: {
      'Content-Type': undefined
    }
  };

export function RestFactory(
  restangular: Restangular,
  crResource: Resource,
) {

  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, UPLOAD_IMAGE);
    }
  );

  return restangular.service('location');
}

export let imageServiceProvider =
  { provide: IMAGE_REST,
    useFactory: RestFactory,
    deps: [Restangular, Resource]
  };
