import {AppState} from "../../providers/app-state/app-state";
import {AppStateService} from "../../providers/app-state/app-state.service";
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProfileService} from "front-end-common";

/**
 * Presentation of the properties carried by the App State service.
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
    public profile: ProfileService,
  ) {
    this.appState = this.appStateService.getAppState();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

}
