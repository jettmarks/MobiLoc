import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";

/**
 * Generated class for the AttractionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-attraction',
  templateUrl: 'attraction.html',
})
export class AttractionPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttractionPage: ' + this.navParams.get('name'));
  }

}
