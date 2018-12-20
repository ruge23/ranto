//import { SelectCategoriesPage } from './../pages/select-categories/select-categories';
//import { UltimoPasoPage } from './../pages/ultimo-paso/ultimo-paso';
//import { SignupPage } from './../pages/signup/signup';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from './../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { Storage } from '@ionic/storage';
//import { UltimoPasoPage } from '../pages/ultimo-paso/ultimo-paso';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //@ViewChild(Nav) nav: Nav;

  rootPage: any=LoginPage;

  //pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage) {

    this.platform.ready().then(() => {
    
      /* storage.get("_uid_").then(x => {
        if (x != null && x > 0) {
          this.rootPage = MenuPage;
        }
        else{
          this.rootPage = LoginPage;
        }
      }); */
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      if (platform.is("android")) {
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString("#000000");
      }
      this.splashScreen.hide();

    });

    // used for an example of ngFor and navigation
    /* this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Perfil', component: ListPage },
      {title: 'Mis Comercios', component: MisComerciosPage },
      {title: 'Puestos de Trabajo', component: TrabajoPage }
    ]; */

  }



  /* openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
   }*/
}
