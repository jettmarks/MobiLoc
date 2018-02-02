import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {AuthService, RegistrationPage} from "front-end-common";
import {HomePage} from "../pages/home/home";
import {ListPage} from "../pages/list/list";
import {LocEditPage} from "../pages/loc-edit/loc-edit";
import {ProfileService} from "../../../front-end-common/src/providers/profile/profile.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public authService: AuthService,
    public profileService: ProfileService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Map', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Edit', component: LocEditPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ngOnInit() {
    console.log("App is initialized");
    this.nav.setRoot(HomePage);
    if (this.authService.isAuthenticated()) {
      console.log("1. App is registered under " + this.profileService.getPrincipal());
    } else {
      console.log("1. App is unregistered");
      this.nav.push(RegistrationPage);
    }
  }
}
