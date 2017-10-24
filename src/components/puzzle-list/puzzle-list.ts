/**
 * Created by jett on 10/23/17.
 */
import {Component, Injectable} from "@angular/core";
@Injectable()
@Component({
  selector: 'puzzle-list',
  templateUrl: 'puzzle-list.html'
})
export class PuzzleListComponent {
  public items: Array<{name: string}> = [
    {
      name: "puzzle1"
    },
    {
      name: "puzzle2"
    },
  ];

  public itemTapped($event, item) {

  }

}
