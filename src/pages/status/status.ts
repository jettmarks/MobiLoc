import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppStateService} from "../../providers/app-state/app-state.service";
import {AppState} from "../../providers/app-state/app-state";

/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  appState: AppState;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appStateService: AppStateService,
  ) {
    this.appState = this.appStateService.getAppState();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

}
