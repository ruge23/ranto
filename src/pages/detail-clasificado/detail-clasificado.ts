import { UserClasificadoPage } from './../user-clasificado/user-clasificado';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail-clasificado',
  templateUrl: 'detail-clasificado.html',
})
export class DetailClasificadoPage {

  detalle_puesto:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detalle_puesto = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailClasificadoPage');
  }

  verClasificado(userid){
    this.navCtrl.push(UserClasificadoPage,userid)
  }
}
