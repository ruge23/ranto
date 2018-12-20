import { ListPage } from './../list/list';
import { VoucherPage } from './../voucher/voucher';
import { ListEmpleosPage } from './../list-empleos/list-empleos';
import { ListProdPage } from './../list-prod/list-prod';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListVouchersPage } from '../list-vouchers/list-vouchers';

@IonicPage()
@Component({
  selector: 'page-perfil-comercio',
  templateUrl: 'perfil-comercio.html',
})
export class PerfilComercioPage {

  info : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.info = this.navParams.data;  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilComercioPage');
    console.log(this.navParams.data);
  }

  goToListProd(){
    this.navCtrl.push(ListProdPage,this.info.tiendaid);
  }

  goToListEmpleo(){
    this.navCtrl.push(ListEmpleosPage,this.info.tiendaid);
  }

  goToLisVoucher(){
    this.navCtrl.push(ListVouchersPage,this.info.tiendaid);
  }

}
