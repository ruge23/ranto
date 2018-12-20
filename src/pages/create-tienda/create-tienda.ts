import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the CreateTiendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-tienda',
  templateUrl: 'create-tienda.html',
})
export class CreateTiendaPage {
  nombre: string;
  direccion: string;
  telefono: string;
  base64Image: any;
  imageBox: any = [];
  showMsgError: boolean = false;
  msgError: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private services: ServicesProvider, private camera: Camera,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTiendaPage');
  }

  crearTienda(){
    if(this.validacion())
    {
      this.services.crearTienda(this.nombre, this.direccion,this.telefono, this.imageBox).subscribe(x => {
        this.toastExito();
        this.navCtrl.pop();
      });
    }
    else{
      //msgerror		
      this.showMsgError = true;
      this.toastError();
    }
  }

  validacion(){
    let ret = true;
    let msg = "";
    if(this.nombre == ""){
      ret = false;
      msg += "Debe completar el nombre";
    }
    if(this.direccion == ""){
      ret = false;
      msg += "Debe completar la direccion";
    }
    if(this.imageBox.length == 0){
      ret = false;
      msg += "Debe agregar al menos una imagen";
    }
    if(this.telefono == ""){
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

  abrirGaleria() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageBox.push(this.base64Image);
     
      console.log('ArrayImage', this.imageBox);
    }, (err) => {
      console.log('err en getPicture', err);
    })
  }
  eliminarImg(index) {
    this.imageBox.splice(index, 1);
  }

}
