import { ServicesProvider } from './../../providers/services/services';
import { IntVoucherPage } from './../int-voucher/int-voucher';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { VOUCHERS } from '../../data/vouchers-mok';


@IonicPage()
@Component({
  selector: 'page-voucher',
  templateUrl: 'voucher.html',
})
export class VoucherPage {
  
  icons : string = "camera";
  vouchers :any=[];
  vouchersusados :any=[];
  voucherssinusar :any=[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services : ServicesProvider
  ) {
   this.getVouchers();
  }

  getVouchers(){
    this.services.getMisVouchers().subscribe((data)=>{
      console.log(data['data']);
      this.vouchers = JSON.parse(data['data']);
      this.vouchersusados = this.vouchers.filter(x => x.usado == 1);
      this.voucherssinusar = this.vouchers.filter(x => x.usado == 0);

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoucherPage');
  }

  goToIntVoucher(voucher){
    this.navCtrl.push(IntVoucherPage, voucher);
  }

}
