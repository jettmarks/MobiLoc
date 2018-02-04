/**
 * Created by jett on 10/23/17.
 */
import {Component, Injectable, Input} from "@angular/core";
// tslint:disable-next-line
import {Restangular} from "ngx-restangular";
import {ModalController} from "ionic-angular";
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
    private modalController: ModalController,
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
    let puzzleItem = {
      item: item
    }
    const puzzleModal = this.modalController.create('PuzzleModalPage', puzzleItem);
    puzzleModal.present();
  }

}
