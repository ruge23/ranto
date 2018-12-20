import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { InternaProdPage } from '../interna-prod/interna-prod';

/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {
  items: any;
  fromItems: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider: ServicesProvider) {
    this.fromItems = 0;
    serviceProvider.buscarProductos(navParams.data, this.fromItems).subscribe(x => {
      this.items = JSON.parse(x["data"]);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');
  }
  
  goToInternaProducto(item){
    this.navCtrl.push(InternaProdPage, item);
  }

}
