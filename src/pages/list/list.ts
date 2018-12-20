import { CreateVoucherPage } from './../create-voucher/create-voucher';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//import { IntVoucherPage } from '../int-voucher/int-voucher';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  goToCreate(){
    this.navCtrl.push(CreateVoucherPage)
  }
}
