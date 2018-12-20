import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntTiendaPage } from '../int-tienda/int-tienda';
import { ServicesProvider } from '../../providers/services/services';

@Component({
  selector: 'page-int-voucher',
  templateUrl: 'int-voucher.html',
})
export class IntVoucherPage {

  dataVoucher: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public services: ServicesProvider) {
    this.dataVoucher = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntVoucherPage');
    console.log('datavoucher', this.dataVoucher)
  }

  goToIntTienda(tienda) {
    console.log("datatienda", tienda);
    this.navCtrl.push(IntTiendaPage, {data: [tienda]} );
  }

  verCodigo() {
    this.services.usarVoucher(this.dataVoucher.voucherid).subscribe((x) => {
      this.dataVoucher.codigo = JSON.parse(x["data"]);
    });
  }

  eliminarVoucher() {
    this.services.borrarVoucher(this.dataVoucher.voucherid).subscribe((data) => {
      this.navCtrl.pop();
    });
  }

}
