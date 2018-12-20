import { MenuPage } from './../menu/menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrabajoPage } from '../../pages/trabajo/trabajo';
import { SearchPage } from '../../pages/search/search';
import { HomePage } from '../../pages/home/home';
import { VoucherPage } from '../../pages/voucher/voucher';
import { TabsPage } from '../../tabs/tabs';
import { ServicesProvider } from '../../providers/services/services';
import { InternaProdPage } from '../interna-prod/interna-prod';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  tab1Root = HomePage;
  tab2Root = VoucherPage;
  //tab3Root = ShopCartPage;
  tab3Root = SearchPage;
  tab4Root = TrabajoPage;
  productos: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider: ServicesProvider) {
    
  }

  ionViewWillEnter(){
    this.getFavoritos();
  }

  getFavoritos(){
    this.serviceProvider.getMisFavoritos().subscribe(x=>{
      this.productos = JSON.parse(x["data"]);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  
  goToIntProd(product){
    this.navCtrl.push(InternaProdPage, product);
  }

  goto(a){
    console.log('click');
    switch (a){
      case 2 :
        this.navCtrl.setRoot(MenuPage, 1);
        break;
      case 3 :
        this.navCtrl.setRoot(MenuPage, 3);
        break;
      case 4 :
        this.navCtrl.setRoot(MenuPage, 4);
    }
  }

}
