import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { CreateVoucherPage } from '../create-voucher/create-voucher';

/**
 * Generated class for the ListVouchersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-vouchers',
  templateUrl: 'list-vouchers.html',
})
export class ListVouchersPage {
  vouchers: any = [];
  tiendaid:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider) {
    this.tiendaid = this.navParams.data;
    this.getVouchers();
  }
  getVouchers(){
    this.service.getVouchersPorTienda(this.tiendaid).subscribe((x)=>{
      this.vouchers = JSON.parse(x["data"]);
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListVouchersPage');
  }
  goToCreate(){
    this.navCtrl.push(CreateVoucherPage,this.tiendaid)
  }

}
