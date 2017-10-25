/**
 * Created by jett on 10/23/17.
 */
import {Component, Injectable, Input} from "@angular/core";
import {Restangular} from "ngx-restangular";
import Puzzle = clueRide.Puzzle;
@Injectable()
@Component({
  selector: 'puzzle-list',
  templateUrl: 'puzzle-list.html',
})
export class PuzzleListComponent {

  @Input() locationId;
  public puzzles: Array<Puzzle>;

  constructor (
    public restangular: Restangular,
  ) {
  }

  ngOnInit(): void {

    // this.puzzleService.byLocation({}).all(this.locationId)
    this.restangular.one("puzzle/location", this.locationId).getList()
      .subscribe(
        (puzzles) => {
          this.puzzles = puzzles;
        }
      );
  }

  public itemTapped($event, item) {

  }

}
