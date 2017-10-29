import {Component} from "@angular/core";
import {IonicPage, NavParams, ViewController} from "ionic-angular";
import Puzzle = clueRide.Puzzle;

/**
 * Generated class for the PuzzleModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-puzzle-modal',
  templateUrl: 'puzzle-modal.html',
})
export class PuzzleModalPage {

  public puzzle: Puzzle;

  constructor(private navParams: NavParams, private view: ViewController) {
  }

  saveAndCloseModal() {
    this.view.dismiss();
  }

  cancelAndCloseModal() {
    this.view.dismiss();
  }

  selectCorrectAnswer(key) {
    this.puzzle.correctAnswer = key;
  }

  ionViewWillLoad() {
    this.puzzle = this.navParams.get('item');

    console.log('ionViewWillLoad PuzzleModalPage: ' + this.puzzle.name);
  }

}
