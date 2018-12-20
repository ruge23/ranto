import { ServicesProvider } from './../../providers/services/services';
import { CreateEmpleoPage } from './../create-empleo/create-empleo';
import { DetailPuestoComPage } from './../detail-puesto-com/detail-puesto-com';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { TRABAJOS } from '../../data/trabajos-mok';


@Component({
  selector: 'page-list-empleos',
  templateUrl: 'list-empleos.html',
})
export class ListEmpleosPage {

  empleos:any=[]
  tiendaid: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ServicesProvider) {
    this.tiendaid = navParams.data;
    this.getTrabajos();
  }

  getTrabajos(){
    this.service.getPuestosPorTienda(this.tiendaid).subscribe((x)=>{
      this.empleos = JSON.parse(x["data"]);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListEmpleosPage');
  }

  detallePuesto(puesto){
    this.navCtrl.push(DetailPuestoComPage, puesto);
  }

  goToCreate(){
    this.navCtrl.push(CreateEmpleoPage, this.tiendaid)
  }

}
