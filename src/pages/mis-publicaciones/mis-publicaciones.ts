import { IntProdUserPage } from './../int-prod-user/int-prod-user';
import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { InternaProdPage } from '../interna-prod/interna-prod';


@Component({
  selector: 'page-mis-publicaciones',
  templateUrl: 'mis-publicaciones.html',
})
export class MisPublicacionesPage {
  publicacionesactivo: any;
  publicacionesfinalizadas: any;
  icons: string = 'camera';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private services: ServicesProvider) {
    this.getProdsUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisPublicacionesPage');
  }

  goToInterna(prod){
    this.navCtrl.push(IntProdUserPage, prod);
  }

  getProdsUser() {
    this.services.getProductosPorUsuario().subscribe(x => {
      let prods = JSON.parse(x["data"]);
      console.log("prods", prods);
      prods.map(m => {
        let fechavenc = new Date();
        let fechapu = new Date(m.fechapublicacion);
        fechavenc.setDate(fechapu.getDate() + 15);
        m.fechav = fechavenc;
      });
      console.log("prods 2", prods);
      this.publicacionesactivo = prods.filter(f => f.fechav.getDate() >= Date.now());
      this.publicacionesfinalizadas = prods.filter(f => f.fechav.getDate() < Date.now());
      console.log("prods activos",  this.publicacionesactivo);
      console.log("prods vencidos", this.publicacionesfinalizadas);
    });
  }

}
