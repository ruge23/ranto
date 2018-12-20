import { CreateProdUserPage } from './../pages/create-prod-user/create-prod-user';
import { TrabajoPage } from './../pages/trabajo/trabajo';
import { SearchPage } from './../pages/search/search';
import { HomePage } from './../pages/home/home';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { VoucherPage } from '../pages/voucher/voucher';
import { MisPublicacionesPage } from '../pages/mis-publicaciones/mis-publicaciones';
import { MisDatosPage } from '../pages/mis-datos/mis-datos';
import { CurriculumPage } from '../pages/curriculum/curriculum';
import { VerCurriculumPage } from '../pages/ver-curriculum/ver-curriculum';
import { ModificarCategoriasPage } from '../pages/modificar-categorias/modificar-categorias';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {

  
  tab1Root = HomePage;
  tab2Root = VoucherPage;
  tab5Root = CreateProdUserPage;
  tab3Root = SearchPage;
  tab4Root = TrabajoPage;
  myIndex:number;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
    //this.countCarItem = this.storage.get('products-add') ? this.storage.get('products-add').then((val)=> this.badge = val) : this.badge = 0;
    //this.countCarItem();
  }
  martin(){
    this.navCtrl.popToRoot()
  }
  
  /* ngOnInit(){  
    this.count$ = this.shoppingService.listSize;
  } */
  /* ionViewDidLoad(){
  } */


}
