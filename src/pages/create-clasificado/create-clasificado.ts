import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-create-clasificado',
  templateUrl: 'create-clasificado.html',
})
export class CreateClasificadoPage {


  showMsgError: boolean = false;
  msgError: string = "";
  titulo: string = "";
  detalle: string = "";
  constructor(
    public toastCtrl: ToastController, 
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private services: ServicesProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateClasificadoPage');
  }

  guardarClas() {
    if (this.validacion()) {
      this.services.crearClasificado(this.titulo, this.detalle).subscribe(x => {
        console.log('crea', x['status'])
        if (x['status'] === 200) {
          this.toastExito();
          this.navCtrl.pop();
        }
      })
    }
    else {
      //msgerror	
      this.showMsgError = true;
      this.toastError();
    }
  }
  validacion() {
    let ret = true;
    let msg = "";
    if (this.titulo == "") {
      ret = false;
      msg += "Debe completar el titulo";
    }
    if (this.detalle == "") {
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
