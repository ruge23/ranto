import { ListProdCatPage } from './../list-prod-cat/list-prod-cat';
import { ServicesProvider } from './../../providers/services/services';
//import { OTHER } from './../../data/categories-mok';
//import { PRODUCTOS } from './../../data/listProducts-mok';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriasPage } from '../categorias/categorias';
//import { InternaProdPage } from '../interna-prod/interna-prod';


@Component({
  selector: 'page-all-categories',
  templateUrl: 'all-categories.html',
})
export class AllCategoriesPage {

  className:string;
  //caca:string="#e4e4e4";
  categories:any =[];
  all:any=[];
  count:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service : ServicesProvider) {
    this.service.getCategories().subscribe((data)=>{
     
      this.all = JSON.parse(data['data']);
      this.count = 1;
      this.all.map((x)=>{
     
      if(this.count == 1 || this.count == 4 || this.count == 7 || this.count == 10 || this.count == 13 || this.count == 16){
          x.className = "5px solid #58dbd2";
        }
        else if(this.count == 2 || this.count == 5 || this.count == 8 || this.count == 11 || this.count == 14 || this.count == 17){
          x.className = "5px solid #FEAC52";          
        }
        else{
          x.className = "5px solid #918BF9";
        }      
        this.count++;
      });    
    })
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllCategoriesPage');
  }

  goToIntProd(catid){
    this.navCtrl.push(CategoriasPage, catid);
  }

}
