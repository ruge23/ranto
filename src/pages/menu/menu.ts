import { VoucherPage } from "./../voucher/voucher";
import { CreateProdPage } from "./../create-prod/create-prod";
import { FavoritesPage } from "./../favorites/favorites";
import { SearchPage } from "./../search/search";

import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Nav, App } from "ionic-angular";

import { LoginPage } from "./../login/login";
import { MisComerciosPage } from "./../mis-comercios/mis-comercios";
import { HomePage } from "./../home/home";
import { ListPage } from "../list/list";
import { TrabajoPage } from "../trabajo/trabajo";
import { TabsPage } from "../../tabs/tabs";
import { PerfilComercioPage } from "../perfil-comercio/perfil-comercio";
import { Storage } from "@ionic/storage";

export interface PageInterface {
  title: string;
  pageName: any;
  tabComponent?: any;
  index?: number;
  icon: string;
  isMenu: boolean;
}

@IonicPage()
@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage {
  rootPage = TabsPage;
  username = "";

  pages: PageInterface[] = [
    {
      title: "Home",
      pageName: "HomePage",
      tabComponent: "HomePage",
      index: 0,
      icon: "home",
      isMenu: true
    },
    {
      title: "Vouchers",
      pageName: "VoucherPage",
      tabComponent: "VoucherPage",
      index: 1,
      icon: "home",
      isMenu: true
    },
    {
      title: "Favoritos",
      pageName: FavoritesPage,
      tabComponent: "FavoritesPage",
      index: 5,
      icon: "home",
      isMenu: false
    },
    {
      title: "Buscar",
      pageName: "SearchPage",
      tabComponent: "SearchPage",
      index: 3,
      icon: "home",
      isMenu: true
    },
    {
      title: "Clasificado",
      pageName: "TrabajoPage",
      tabComponent: "TrabajoPage",
      index: 4,
      icon: "home",
      isMenu: true
    }
  ];
  // Reference to the side menus root nav
  @ViewChild(Nav) nav: Nav;

  myIndex: number;
  page: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appCtrl: App,
    private storage: Storage
  ) {
    console.log("params", this.navParams.data);
  }
  private app: App;

  openPage(page: PageInterface) {
    let params = {};

    if (page.isMenu) {
      if (page.index) {
        params = { tabIndex: page.index };
        //console.log('aqui', params)
      }

      if (this.nav.getAllChildNavs() && page.index != undefined) {
        console.log("jaja", this.nav.getAllChildNavs());
        this.nav.getActiveChildNav().select(page.index);
      } else {
        //this.nav.setRoot(page.pageName, params);
      }
    } else {
      this.navCtrl.push(FavoritesPage);
      //this.nav.setRoot('HomePage',{tabIndex: 0})
    }
  }

  ionViewWillEnter() {
    console.log("param", this.navParams.data);
    //this.navCtrl.setRoot(VoucherPage);
    //console.log('aqui',this.nav.getActiveChildNav());
    if (this.navParams.data > 0) {
      let result = this.pages.filter(x => x.index == this.navParams.data)[0];
      //console.log(result);
      this.openPage(result);
      //console.log('page', this.nav.getAllChildNavs());
      /*this.openPage(this.page); */
      //this.nav.getActiveChildNav().select(this.myIndex);
    }
  }

  goToMiTienda() {
    this.navCtrl.push(MisComerciosPage);
  }

  logout() {
    this.storage.set("_uid_", null);
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}
