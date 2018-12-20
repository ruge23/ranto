import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntTiendaPage } from '../int-tienda/int-tienda';
import { ServicesProvider } from '../../providers/services/services';
import { UserClasificadoPage } from '../user-clasificado/user-clasificado';

//import { COMERCIOS } from './../../data/comercios-mok';

@IonicPage()
@Component({
    selector: 'page-interna-prod',
    templateUrl: 'interna-prod.html',
})
export class InternaProdPage {

    data_prod: any;
    isChecked :boolean;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        private serviceProvider: ServicesProvider
    ) {
        this.data_prod = this.navParams.data;
        this.isChecked = (this.data_prod.fav != 0);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InternaProdPage');
        console.log('aqui', this.navParams);
    }

    favorito(productoid){
        (this.isChecked) ? this.removeFavorito(productoid) : this.addFavorito(productoid);
    }

    addFavorito(productid){
        this.serviceProvider.setGuardarProdFav(productid).subscribe(x=>{
            console.log('x', x);
            (x['status']===200)?this.isChecked = true : this.isChecked;
        })
    }

    removeFavorito(productid){
        this.serviceProvider.borrarFavorito(productid).subscribe(x=>{
            //console.log('x', x);
            (x['status']===200)?this.isChecked = false : this.isChecked;
        })
    }

    goToIntTienda() {
        if (this.data_prod.tiendaid == null) {
            console.log("data prod", this.data_prod)
            this.navCtrl.push(UserClasificadoPage, this.data_prod.usuarioid);
        }
        else {
            this.serviceProvider.getTiendaPorId(this.data_prod.tiendaid).subscribe(x => {
                this.navCtrl.push(IntTiendaPage, JSON.parse(x["data"]));
            })
        }
    }
}
