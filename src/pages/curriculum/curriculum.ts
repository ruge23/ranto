import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the CurriculumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curriculum',
  templateUrl: 'curriculum.html',
})
export class CurriculumPage {

  private postulado: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider: ServicesProvider) {

    this.serviceProvider.getMiCV().subscribe(x => {
    console.log("el cv",JSON.parse(x['data'])[0]);
    this.postulado = JSON.parse(x['data'])[0];
    if(this.postulado.experiencia == null || this.postulado.experiencia == undefined)
    {
      this.postulado.experiencia = [];
    }
    console.log("nombre", this.postulado.nombre)
    })
  }

  calcularEdad(birthday) { // birthday is a date
    var fecha = new Date(birthday);
     var ageDifMs = Date.now() - fecha.getTime();
     var ageDate = new Date(ageDifMs); // miliseconds from epoch
     return Math.abs(ageDate.getUTCFullYear() - 1970);
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerCurriculumPage');
  }

}
