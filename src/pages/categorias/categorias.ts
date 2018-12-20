import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map'

//import { CATEGORIAS } from './../../data/slides-mok';
//import { OTHER } from './../../data/categories-mok';
//import { PRODUCTOS } from '../../data/listProducts-mok';
import { InternaProdPage } from './../interna-prod/interna-prod';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  data: any =[];
  slides1: any;
  slides2: any;
  products:any =[];
  time:any = new Date();
  titulo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ServicesProvider) {
    //this.getSlides();
    console.log('caty',this.navParams.data);
    this.getProducts(this.navParams.data.categoriaid);
    this.titulo = this.navParams.data.nombre;
  }


  getSlides(){
    this.service.getSlides().subscribe((data)=>{
      this.data = data;
      this.slides1 = this.data[0].data1;
      this.slides2 = this.data[0].data2;
    })
  }

  getProducts(categoriaid){
    this.service.getProductosPorCategoria(categoriaid).subscribe((x)=>{
      console.log('data',JSON.parse(x['data']))
      this.products = JSON.parse(x['data']);
    })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
  }

  goToIntProd(product){
    this.navCtrl.push(InternaProdPage, product);
  }

  goTointerna(slide) {
    this.navCtrl.push(InternaProdPage, { data: slide });
  }
}
