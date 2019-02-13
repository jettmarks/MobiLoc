/**
 * Created by jett on 10/23/17.
 */
import {Component, Injectable, Input} from "@angular/core";
// tslint:disable-next-line
import {Restangular} from "ngx-restangular";
import {ModalController} from "ionic-angular";
import {Location, Puzzle, PuzzleService} from "front-end-common";

@Injectable()
@Component({
  selector: 'puzzle-list',
  templateUrl: 'puzzle-list.html',
})
export class PuzzleListComponent {

  @Input() location: Location;
  public puzzles: Array<Puzzle>;

  constructor (
    public restangular: Restangular,
    private modalController: ModalController,
    private puzzleService: PuzzleService,
  ) {
  }

  ngOnInit(): void {

    // this.puzzleService.byLocation({}).all(this.locationId)
    this.restangular.one("puzzle/location", this.location.id).getList()
      .subscribe(
        (puzzles) => {
          this.puzzles = puzzles;
        }
      );
  }

  public itemTapped($event, item) {
    this.openModalForPuzzleItem(item);
  }

  openModalForPuzzleItem(item) {
    const puzzleItem = {
      puzzle: item,
      location: this.location
    };
    const puzzleModal = this.modalController.create('PuzzleModalPage', puzzleItem);
    puzzleModal.present();
  }

  /**
   *
   */
  addNewPuzzle() {
    console.log("Adding new Puzzle");
    this.puzzleService.getBlankPuzzleForLocation(this.location).subscribe(
      (puzzle) => {
        this.puzzles.push(puzzle);
        this.openModalForPuzzleItem(puzzle);
      }
    );
  }

}
