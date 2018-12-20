import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InternaProdPage } from '../interna-prod/interna-prod';


@IonicPage()
@Component({
  selector: 'page-int-tienda',
  templateUrl: 'int-tienda.html',
})
export class IntTiendaPage {

  dataTienda: any;
  productos: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataTienda = this.navParams.data[0];
    
    this.productos =JSON.parse(this.dataTienda.productos);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntTiendaPage');
    console.log('data', this.dataTienda);
  }

  goToInternaProd(product){
    this.navCtrl.push(InternaProdPage, product);
  }

}
