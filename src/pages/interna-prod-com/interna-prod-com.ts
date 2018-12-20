import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { UserClasificadoPage } from '../user-clasificado/user-clasificado';
import { IntTiendaPage } from '../int-tienda/int-tienda';

@IonicPage()
@Component({
  selector: 'page-interna-prod-com',
  templateUrl: 'interna-prod-com.html',
})
export class InternaProdComPage {

  data_prod: any;
  isChecked :boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: ServicesProvider) {        
    this.data_prod = this.navParams.data;
    console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InternaProdComPage');
    console.log('aqui', this.data_prod);
  }

  favorito(productoid){
    (this.isChecked) ? this.removeFavorito(productoid) : this.addFavorito(productoid);
  }

  addFavorito(productid){
    this.services.setGuardarProdFav(productid).subscribe(x=>{
        console.log('x', x);
        (x['status']===200)?this.isChecked = true : this.isChecked;
    })
  }

  removeFavorito(productid){
    this.services.borrarFavorito(productid).subscribe(x=>{
        //console.log('x', x);
        (x['status']===200)?this.isChecked = false : this.isChecked;
    })
  }

  goToIntTienda() {
    if (this.data_prod.tiendaid == null) {
        this.navCtrl.push(UserClasificadoPage, this.data_prod.usuarioid);
    }
    else {
        this.services.getTiendaPorId(this.data_prod.tiendaid).subscribe(x => {
            this.navCtrl.push(IntTiendaPage, JSON.parse(x["data"]));
        })
    }
}

}
