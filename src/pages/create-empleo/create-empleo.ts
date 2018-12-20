import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';


@Component({
  selector: 'page-create-empleo',
  templateUrl: 'create-empleo.html',
})
export class CreateEmpleoPage {
  listaAreas: any = [];
  listaCargahoraria: any = [];
  titulo: string;
  direccion: string;
  cargahoraria: number;
  area: number;
  salario: string;
  horario: string;
  detalle: string;
  tiendaid: number;
  showMsgError: boolean = false;
  msgError: string = "";
  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
    public service: ServicesProvider) {
    this.tiendaid = navParams.data;
    service.getAreayYCargahoraria().subscribe(x => {
      console.log(JSON.parse(x["data"]));
      this.listaAreas = JSON.parse(x["data"])["areas"];
      this.listaCargahoraria = JSON.parse(x["data"])["cargahorarias"];
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEmpleoPage');
  }

  createEmpleo() {
    if (this.validacion()) {
      this.service.crearPuestoTrabajo(this.tiendaid, this.titulo, this.direccion, this.cargahoraria, this.area, this.salario, this.horario, this.detalle).subscribe(x => {
        this.toastExito();
      })
    }
    else{
      //mssgerror		
      this.showMsgError = true;
      this.toastError();
    }
  }
  validacion() {
    let ret = true;
    let msg = "";
    if(this.titulo == ""){
      ret = false;
      msg += "Debe completar el titulo";
    }
    if(this.direccion == ""){
      ret = false;
      msg += "Debe completar la direccion";
    }
    if(this.cargahoraria == 0){
      ret = false;
      msg += "Debe seleccionar una carga horaria";
    }
    if(this.area == 0){
      ret = false;
      msg += "Debe seleccionar un area";
    }
    if(this.salario == ""){
      ret = false;
      msg += "Debe completar el salario";
    }
    if(this.horario == ""){
      ret = false;
      msg += "Debe completar el horario";
    }
    if(this.detalle == ""){
      ret = false;
      msg += "Debe completar el detalle";
    }
    this.msgError = msg;
    return ret;
  }

  toastExito() {
    let toast = this.toastCtrl.create({
      message: 'Se ha guardado con exito!',
      duration: 2000,
      position: 'top',
      cssClass: 'toastExito'
    });
  
    toast.onDidDismiss(() => {
     
    });
  
    toast.present();
  }

  toastError() {
    let toast = this.toastCtrl.create({
      message: this.msgError,
      showCloseButton: true,
      closeButtonText: "X",
      duration: 5000,
      position: 'top',
      cssClass: 'toastError'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
