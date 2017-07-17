import { Injectable } from '@angular/core';
import {Resource, ResourceAction, ResourceMethod, ResourceParams} from "ngx-resource";
import Badge = clueRide.Badge;
import {RequestMethod} from "@angular/http";

/*
  Generated class for the ResourceBadgeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
@ResourceParams({
  url: 'http://localhost:8080/rest/login'
})
export class BadgeResource extends Resource {

  /* Login given the OAuthCredentials provided. */
  @ResourceAction({
    method: RequestMethod.Post,
    isArray: true,
    path: '/oauth'
  })
  oAuth: ResourceMethod<{
    email: string,
    profilePicture: string
  }, Badge[]>;
}
