import { ServicesProvider } from './../../providers/services/services';
import { CreateProdPage } from './../create-prod/create-prod';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InternaProdComPage } from './../interna-prod-com/interna-prod-com';
import { InternaProdPage } from '../interna-prod/interna-prod';
//import { PRODUCTOS } from '../../data/listProducts-mok';

@IonicPage()
@Component({
  selector: 'page-list-prod',
  templateUrl: 'list-prod.html',
})
export class ListProdPage {

  galleryType='regular';
  info: any;
  list: any = [];
  images: Array<string>;
  grid: Array<Array<string>>; //array of arrays
  tiendaid:number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private service: ServicesProvider
  ) {
   
    //this.grid = Array(Math.ceil(this.images.length/2)); //MATHS!
    this.tiendaid = this.navParams.data;
   
  }

  getProducts(){  
    this.service.getProductosPorTienda(this.tiendaid).subscribe((x)=>{
      this.list = JSON.parse(x["data"]);
      this.images = this.list.map((obj)=>{return obj.image});
    })
  }

  ionViewWillEnter(){
    this.getProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListProdPage');
    console.log(this.images);
    console.log('info', this.info);
  }

  ionViewLoaded() {

    let rowNum = 0; //counter to iterate over the rows in the grid
  
    for (let i = 0; i < this.images.length; i+=2) { //iterate images
  
      this.grid[rowNum] = Array(2); //declare two elements per row
  
      if (this.images[i]) { //check file URI exists
        this.grid[rowNum][0] = this.images[i] //insert image
      }
  
      if (this.images[i+1]) { //repeat for the second image
        this.grid[rowNum][1] = this.images[i+1]
      }
  
      rowNum++; //go on to the next row
    }
  
  }

  goToCreateProd(){
    this.navCtrl.push(CreateProdPage, this.tiendaid);
  }

  goToInterna(product){
    this.navCtrl.push(InternaProdPage, product);
  }
}
