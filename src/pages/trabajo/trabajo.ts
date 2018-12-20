import { CreateClasificadoPage } from './../create-clasificado/create-clasificado';
import { ServicesProvider } from './../../providers/services/services';
import { DetailClasificadoPage } from './../detail-clasificado/detail-clasificado';
//import { CLASIFICADOS } from './../../data/clasificados-mok';
import { DetallePuestoPage } from './../detalle-puesto/detalle-puesto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchResultPage } from '../search-result/search-result';
import { SearchResultTrabajoPage } from '../search-result-trabajo/search-result-trabajo';

//import { TRABAJOS } from './../../data/trabajos-mok';

@IonicPage()
@Component({
  selector: 'page-trabajo',
  templateUrl: 'trabajo.html',
})
export class TrabajoPage {

  showList:boolean = false;
  puestos: any=[];
  clasificados:any=[];
  items: any;
  txtbusqueda: string;
  expanded1:boolean=false;
  expanded2:boolean=false;
  visible1:boolean=false;
  visible2:boolean=false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: ServicesProvider
  ) {
    
    //this.getClasificados();
  }

  getPuestos(){
    this.services.getPuestosyClasificados().subscribe((data)=>{
      console.log(JSON.parse(data.data)["puestos"]);
      console.log(JSON.parse(data.data)["clasificados"]);
      this.puestos = JSON.parse(data.data)["puestos"];
      this.clasificados = JSON.parse(data.data)["clasificados"];
      //this.puestos = data;
    })
  }

/*   getClasificados(){
    this.services.getClasificados().subscribe((data)=>{
      this.clasificados = data;
    })
  } */
  ionViewDidLoad() {
    console.log('ionViewDidLoad TrabajoPage');
  }
  ionViewWillEnter(){
    this.getPuestos();
  }

  detallePuesto(puesto){
    this.navCtrl.push(DetallePuestoPage, puesto);
  }

  detalleClasificado(puesto){
    this.navCtrl.push(DetailClasificadoPage, puesto)
  }

  goToCreateClas(){
    this.navCtrl.push(CreateClasificadoPage);
  }

  goToBusqueda(item){
    this.navCtrl.push(SearchResultTrabajoPage,item);
  }

  expandItem(x) {
    switch(x){
      case 1:
        this.expanded1 = !this.expanded1;
        this.visible1 = !this.visible1;
      break;
      case 2:
        this.expanded2 = !this.expanded2;
        this.visible2 = !this.visible2;
      break;                
    }
  }

  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log("bus");
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '' && val.length > 3) {
      //console.log("bus", val);
      this.services.buscarEmpleosAuto(val).subscribe(res => {
        //console.log(res);
        this.items = JSON.parse(res);
      });
    }
    else{
      this.items =[];
    }
  }

}
