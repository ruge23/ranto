import { SelectCategoriesPage } from './../select-categories/select-categories';
import { CurriculumPage } from './../curriculum/curriculum';
//import { FavoritesPage } from './../favorites/favorites';
import { MenuPage } from './../menu/menu';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { MisPublicacionesPage } from '../mis-publicaciones/mis-publicaciones';
import { ConfiguracionPage } from '../configuracion/configuracion';
import { MisDatosPage } from '../mis-datos/mis-datos';
import { VerCurriculumPage } from '../ver-curriculum/ver-curriculum';
import { ServicesProvider } from '../../providers/services/services';
//import {TabsPageComercios} from '../tabComercios/tabs';
//import { HomePage } from '../home/home';
//import { MisComerciosPage } from '../mis-comercios/mis-comercios';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  nombreusuario: string;
  pages = [
    { title: 'Home', pageName: MenuPage},
    { title: 'Mis datos', pageName: MisDatosPage},       
    { title: 'Mi Curriculum', pageName: CurriculumPage},    
    { title: 'Categorias', pageName: SelectCategoriesPage},
    { title: 'Mis publicaciones', pageName: MisPublicacionesPage},
  ]

  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ServicesProvider) {
    this.nombreusuario = service._usuario.nombre + " " + service._usuario.apellido; 
  }

  openPage(page) {
    this.navCtrl.push(page.pageName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
