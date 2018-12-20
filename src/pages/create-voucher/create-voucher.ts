import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { ListVouchersPage } from '../list-vouchers/list-vouchers';


@Component({
  selector: 'page-create-voucher',
  templateUrl: 'create-voucher.html',
})
export class CreateVoucherPage {
  titulo: string;
  detalle: string;
  cantidad: number;
  fechavencimiento: Date;
  tiendaid: number;
  showMsgError: boolean = false;
  msgError: string = "";
  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController, public service: ServicesProvider) {
    this.tiendaid = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateVoucherPage');
  }

  crearVoucher() {
    if (this.validacion()) {
      this.service.crearVocuher(this.tiendaid, this.titulo, this.detalle, this.fechavencimiento, this.cantidad).subscribe(x => {
        this.toastExito();
        this.navCtrl.push(ListVouchersPage, this.tiendaid);
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
    if(this.titulo == ""){
      ret = false;
      msg += "Debe completar el titulo";
    }
    if(this.detalle == ""){
      ret = false;
      msg += "Debe completar el detalle";
    }
    if(!this.fechavencimiento){
      ret = false;
      msg += "Debe completar la fecha de vencimiento";
    }
    if(this.cantidad == 0){
      ret = false;
      msg += "Debe completar la cantidad";
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
