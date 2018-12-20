import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-int-evento',
  templateUrl: 'int-evento.html',
})
export class IntEventoPage {

  galleryType='regular';
  data_evento:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data_evento = this.navParams.data;
    console.log('event', this.data_evento)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntEventoPage');
  }

}
