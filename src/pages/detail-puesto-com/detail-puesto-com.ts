import { PostuladosPage } from './../postulados/postulados';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

  
@Component({
  selector: 'page-detail-puesto-com',
  templateUrl: 'detail-puesto-com.html',
})
export class DetailPuestoComPage {

  detalle_puesto: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detalle_puesto = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPuestoComPage');
  }

  postulados() {
    this.navCtrl.push(PostuladosPage,this.detalle_puesto.puestoid);
  }

}
