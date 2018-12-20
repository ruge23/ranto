import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-eventos-dia',
  templateUrl: 'eventos-dia.html',
})
export class EventosDiaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventosDiaPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
