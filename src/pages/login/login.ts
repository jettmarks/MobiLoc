import Badge = clueRide.Badge;
import {Component} from "@angular/core";
import {IonicPage, NavParams} from "ionic-angular";
import {GoogleAuth, User} from "@ionic/cloud-angular";
import {badgeServiceProvider} from "../../providers/resources/badge/badge.service.provider";
import {BadgeService} from "../../providers/resources/badge/badge.service";
import {SessionTokenService} from "../../providers/session-token/session-token.service";

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
  providers: [
    badgeServiceProvider,
    BadgeService
  ]
})
export class LoginPage {
  badges: Badge[];
  crCreds: any = {name: "", password: ""};

  constructor(
    private badgeService: BadgeService,
    public navParams: NavParams,
    public googleAuth: GoogleAuth,
    public user: User,
    public sessionTokenService: SessionTokenService,
  ) {
  }

  authViaGoogle(): void {
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
      }
    ).catch(
      (error) => {
        console.dir(error);
      }
    );
  }

  ionViewDidLoad() {
    console.log('On the Login Page');
  }

  public logout() {
    this.sessionTokenService.logout();
  }

  public login() {
    this.badges = this.badgeService.post(this.crCreds);
  }

}
