import { UltimoPasoPage } from './../ultimo-paso/ultimo-paso';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';


@IonicPage()
@Component({
  selector: 'page-select-categories',
  templateUrl: 'select-categories.html',
})
export class SelectCategoriesPage {

  categories: any = [];
  driver: any = {};
  isCheckboxDisabled: boolean = false;
  checkedDrivers: any = [];
  completolascats: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ServicesProvider) {
    //console.log(this.service.categorias.length);
    if (this.service.categorias.length > 0) {
      this.categories = this.service.categorias;
    } else {
      this.service.getCategories().subscribe(x => {
     
        this.categories = JSON.parse(x['data']);
        console.log("despues")
      })
    }
  }

  checked(driver) {
    console.log('check', driver.checked);
    if (driver.checked === true) {
      this.checkedDrivers.push(driver);
    } else if (driver.checked === false) {
      this.checkedDrivers.splice(this.checkedDrivers.indexOf(driver), 1);
    }

    //check for two selected.
    if (this.categories.filter(driver => driver.checked).length === 2) {
      this.isCheckboxDisabled = true;
    }
  }
  categoriesSelected: any = [];
  selected($event, catid) {
    //console.log('event', $event,catid)
    if ($event._value) {
      if (this.categoriesSelected.length < 3) {
        this.categoriesSelected.push(catid);
      }
      else {
        this.categoriesSelected.push(catid);
        alert("Listo! Ya elegiste las 4 categorias necesarias. Si queres cambiarlas tendras que deseleccionar alguna categoria.")
       //deshabilitar todo el resto
        this.completolascats = true;
      }
    }
    else {
      var index = this.categoriesSelected.indexOf(catid);
      this.categoriesSelected.splice(index, 1);
    }
    console.log("mi array", this.categoriesSelected)
  }
  
  guardarCategorias(){
    this.service.setGuardarCategoriasFav(this.categoriesSelected[0],this.categoriesSelected[1],this.categoriesSelected[2],this.categoriesSelected[3]).subscribe(x =>{

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCategoriesPage');
  }

  goToTerminos() {
    this.guardarCategorias();
    this.navCtrl.push(UltimoPasoPage);
  }

}
