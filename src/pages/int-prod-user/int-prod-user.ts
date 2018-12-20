import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

@Component({
  selector: 'page-int-prod-user',
  templateUrl: 'int-prod-user.html',
})
export class IntProdUserPage {

  data_prod: any;
  isChecked :boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: ServicesProvider) {
      this.data_prod = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntProdUserPage');
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

}
