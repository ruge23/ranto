import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { PostuladosPage } from './../postulados/postulados';
import { ServicesProvider } from '../../providers/services/services';


@IonicPage()
@Component({
  selector: 'page-detalle-puesto',
  templateUrl: 'detalle-puesto.html',
})
export class DetallePuestoPage {

  detalle_puesto: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public serviceProvider: ServicesProvider
  ) {
    this.detalle_puesto = this.navParams.data;
    console.log('detalle', this.detalle_puesto);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePuestoPage');
    console.log('aqui', this.detalle_puesto);
  }

  goToPostulado() {
    this.navCtrl.push(PostuladosPage);
  }

  postulado() {
    const alert = this.alertCtrl.create({
      title: 'Gracias por postularse',
      subTitle: 'Recibiras informacion de este puesto',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    this.serviceProvider.setPostularsePuesto(this.detalle_puesto.puestoid).subscribe(x => {
      alert.present();
    })
  }

}
