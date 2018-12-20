import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

//import { HomePage } from './../home/home';
import { LoginPage } from './../login/login';
import { SelectCategoriesPage } from '../select-categories/select-categories';
import { ServicesProvider } from '../../providers/services/services';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  nombre: string;
  apellido: string;
  fechanacimiento: Date;
  email: string;
  password: string;
  repetirpassword: string;
  localidad: number = 0;
  direccion: string;
  telefono: string;
  provincias: any = [];
  localidades: any = [];
  localidadesProvincia: any = [];
  showMsgError: boolean = false;
  msgError: string = "";
  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public serviceProvider: ServicesProvider) {
    serviceProvider.getProvinciasYLocalidades().subscribe(z => {
      //console.log("prov y loc:",JSON.parse(z["data"]));
      this.provincias = JSON.parse(z["data"]).provincias;
      this.localidades = JSON.parse(z["data"]).localidades;
    })
  }

  onProvinciaChange($event) {
    console.log("evento", $event);
    this.localidadesProvincia = this.localidades.filter(f => f.provinciaid == $event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    if (this.validacion()) {
      this.serviceProvider.crearusuario(this.nombre, this.apellido, this.fechanacimiento, this.email, this.password, this.localidad, this.direccion, this.telefono).subscribe(x => {
        this.serviceProvider.setUserId(JSON.parse(JSON.parse(x["_body"])["data"]));
        this.serviceProvider.getMisDatos().subscribe(z => {
          this.serviceProvider._usuario = JSON.parse(z["data"]);
        })
        this.toastExito();
        this.navCtrl.push(SelectCategoriesPage);
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
    if (this.nombre == "") {
      ret = false;
      msg += "Debe completar el nombre";
    }
    if (this.apellido == "") {
      ret = false;
      msg += "Debe completar el apellido";
    }
    if (!this.fechanacimiento) {
      ret = false;
      msg += "Debe completar la fecha de nacimiento";
    }
    if (this.email == "") {
      ret = false;
      msg += "Debe completar el email";
    }
    if (this.password == "") {
      ret = false;
      msg += "Debe completar el password";
    }
    if (this.localidad == 0) {
      ret = false;
      msg += "Debe completar la localidad";
    }
    if (this.direccion == "") {
      ret = false;
      msg += "Debe completar la direccion";
    }
    if (this.telefono == "") {
      ret = false;
      msg += "Debe completar el telefono";
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


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
