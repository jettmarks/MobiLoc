import {Component} from "@angular/core";
import {IonicPage, NavParams, ViewController} from "ionic-angular";
import {Location, Puzzle, PuzzleService} from "front-end-common";

/**
 * Presents the modal for editing a Puzzle instance.
 */
@IonicPage()
@Component({
  selector: 'page-puzzle-modal',
  templateUrl: 'puzzle-modal.html',
})
export class PuzzleModalPage {

  public puzzle: Puzzle;
  public location: Location;

  constructor(
    private navParams: NavParams,
    private view: ViewController,
    private puzzleService: PuzzleService,
  ) {
  }

  saveAndCloseModal() {
    this.puzzleService.savePuzzle(this.puzzle).subscribe(
      (puzzle) => {
        this.view.dismiss();
      }
    );
  }

  cancelAndCloseModal() {
    this.view.dismiss();
  }

  selectCorrectAnswer(key) {
    this.puzzle.correctAnswer = key;
  }

  ionViewWillLoad() {
    this.puzzle = this.navParams.get('puzzle');
    this.location = this.navParams.get('location');

    console.log('ionViewWillLoad PuzzleModalPage: ' + this.puzzle.name);
  }

}
