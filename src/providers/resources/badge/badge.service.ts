import {Inject, Injectable} from "@angular/core";
import {BADGES_REST} from "./badge.service.provider";
import Badge = clueRide.Badge;
/**
 * Created by jett on 7/22/17.
 */

@Injectable()
export class BadgeService {

  constructor(
    @Inject(BADGES_REST) private resource
  ) {
  }

  /**
   * Send credentials and receive Badges.
   * @param param
   */
  post(param: { name: string; password: string }): Badge[] {
    return this.resource.post(param);
  }

}
