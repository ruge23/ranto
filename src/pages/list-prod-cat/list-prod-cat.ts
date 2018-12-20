import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the ListProdCatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-prod-cat',
  templateUrl: 'list-prod-cat.html',
})
export class ListProdCatPage {
  catid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private service : ServicesProvider) {
    this.catid = this.navParams.data;
    this.service.getProdxCategoria(this.catid).subscribe(x=>{
      console.log('aqui',JSON.parse(x['data']));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListProdCatPage');
  }

}
