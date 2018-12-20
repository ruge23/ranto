import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
* Generated class for the MisDatosPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
 selector: 'page-mis-datos',
 templateUrl: 'mis-datos.html',
})
export class MisDatosPage {
 datos: any = [];
 provincias: any = [];
 localidades: any = [];
 localidadesProvincia: any = [];
 localidad: number;
 provincia: number;
 constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider) {
   service.getProvinciasYLocalidades().subscribe(z => {

     this.provincias = JSON.parse(z["data"]).provincias;
     this.localidades = JSON.parse(z["data"]).localidades;
   });
   service.getMisDatos().subscribe(x => {
     console.log("persona", JSON.parse(x["data"])[0]);
     this.datos = JSON.parse(x["data"])[0];
     console.log("localidadessss",this.localidades);
     console.log("mi local", this.datos.localidadid);
     this.provincia = this.localidades.filter(x => x.localidadid == this.datos.localidadid)[0].provinciaid;
     console.log("provincia",this.provincia);
     this.localidad = this.datos.localidadid;
   });

 }

 onProvinciaChange($event) {
   console.log("evento", $event);
   this.localidadesProvincia = this.localidades.filter(f => f.provinciaid == $event);
 }
 guardarDatos() {
   this.service.actualizarUsuario(this.datos.nombre,this.datos.apellido,this.datos.fechanacimiento,this.datos.email,this.localidad,this.datos.direccion,this.datos.telefono).subscribe(x => {


     this.toastExito();
     this.navCtrl.pop();
   })
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
     message: "",
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

 ionViewDidLoad() {
   console.log('ionViewDidLoad MisDatosPage');
 }

}