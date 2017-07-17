///<reference path="../../providers/resources/badge/badge.ts"/>
import Badge = clueRide.Badge;
import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {GoogleAuth, User} from "@ionic/cloud-angular";
import {BadgeResource} from "../../providers/resources/badge/badge.service";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  badges: Badge[];

  constructor(
    public badgeResource: BadgeResource,
    public navCtrl: NavController,
    public navParams: NavParams,
    public googleAuth: GoogleAuth,
    public user: User
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.googleAuth.logout().catch(
      /* Drop this on the floor for now. */
      (error) => {
        console.dir(error);
      }
    );

    this.googleAuth.login().then(
      (authResult) => {
        console.log('User ' + this.user.social.google.data.full_name + ' has logged in');
        console.log('  Profile Picture: ' + this.user.social.google.data.profile_picture);
        this.badges = this.badgeResource.oAuth({
          email: this.user.social.google.data.email,
          profilePicture: this.user.social.google.data.profile_picture
        });
      }
    ).catch(
      (error) => {
        console.dir(error);
      }
    );
  }

}
