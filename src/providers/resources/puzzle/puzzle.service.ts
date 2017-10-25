import {Inject, Injectable} from "@angular/core";
import {PUZZLE_REST} from "./puzzle.service.provider";
/**
 * Created by jett on 10/24/17.
 */
@Injectable()
export class PuzzleService {
  constructor(
    @Inject(PUZZLE_REST) private resource
  ) {
  }

  byLocation(params: any) {
    return this.resource.byLocation(params);
  }

}
