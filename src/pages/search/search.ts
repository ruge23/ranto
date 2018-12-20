import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { SearchResultPage } from '../search-result/search-result';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  showList: boolean = false;
  items: any;
  txtbusqueda: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider: ServicesProvider) {
  }

  goToBusqueda(item){
    this.navCtrl.push(SearchResultPage,item);
  }

  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log("bus");
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '' && val.length > 3) {
      //console.log("bus", val);
      this.serviceProvider.buscarProductosAuto(val).subscribe(res => {
        //console.log(res);
        this.items = JSON.parse(res);
      });
    }
    else{
      this.items =[];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
