import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the ModificarCategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificar-categorias',
  templateUrl: 'modificar-categorias.html',
})
export class ModificarCategoriasPage {
  categories: any = [];
  driver: any = {};
  isCheckboxDisabled: boolean = false;
  checkedDrivers: any = [];
  completolascats: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ServicesProvider) {
    //console.log(this.service.categorias.length);
  
      this.service.getCategories().subscribe(x => {

        this.categories = JSON.parse(x['data']);
        this.service.getMisCategorias().subscribe(x => {

          let miscats = JSON.parse(x['data']);
          this.categories.map(c =>{
            
              c.ischecked = (miscats.filter(f => f.categoriaid == c.categoriaid).length > 0);
              console.log("cat: ", c.categoriaid, c.ischecked);
          })
          console.log("sekeccuibadadas",this.categoriesSelected);
        })

      })
   
  }
  /*  checked(driver) {
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
   }  */
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
  setselected(catid){
      //console.log('event', $event,catid)
     
          this.categoriesSelected.push(catid);
       
  }
  guardarCategorias() {
    this.service.setGuardarCategoriasFav(this.categoriesSelected[0], this.categoriesSelected[1], this.categoriesSelected[2], this.categoriesSelected[3]).subscribe(x => {

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCategoriesPage');

  }


}
