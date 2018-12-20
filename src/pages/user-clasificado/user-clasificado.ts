import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-user-clasificado',
  templateUrl: 'user-clasificado.html',
})
export class UserClasificadoPage {

  dataUser:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private services:ServicesProvider) {
    console.log("interna user", this.navParams.data);
    this.services.getUserporid(this.navParams.data).subscribe(x=>{
      this.dataUser = JSON.parse(x['data']);
      console.log("data user", this.dataUser);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserClasificadoPage');
  }

}
