import { ServicesProvider } from './../../providers/services/services';
import { PerfilComercioPage } from './../perfil-comercio/perfil-comercio';
//import { COMERCIOS } from './../../data/comercios-mok';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateTiendaPage } from '../create-tienda/create-tienda';

@IonicPage()
@Component({
  selector: 'page-mis-comercios',
  templateUrl: 'mis-comercios.html',
})
export class MisComerciosPage {

  info: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: ServicesProvider
  ) {
    this.getComercios();
  }

  getComercios(){
    this.services.getMisComercios().subscribe((x)=>{
      this.info = JSON.parse(x["data"]);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisComerciosPage');
  }
  goToCrearTienda(){
    this.navCtrl.push(CreateTiendaPage);
  }

  goTo(item){
    //console.log(item)
    this.navCtrl.push(PerfilComercioPage, item);
  }

}
