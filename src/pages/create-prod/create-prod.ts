import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-create-prod',
  templateUrl: 'create-prod.html',
})
export class CreateProdPage {

  categorias:any=[];
  nombreProd:string;
  detalleProd:string;
  precioProd:number;
  base64Image: any;
  imageBox: any = [];
  tiendaid: number;
  categoria: any;
  showMsgError: boolean = false;
  msgError: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController, private services: ServicesProvider, 
    private camera: Camera,public toastCtrl: ToastController) {
    this.tiendaid =  this.navParams.data;
    console.log("tiendaid", this.tiendaid);
    services.getCategories().subscribe(x => {
      this.categorias = JSON.parse(x["data"]);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProdPage');
  }

  guardarProd(){
    if(this.validacion()){
      this.services.crearProductoTienda(this.nombreProd, this.detalleProd,this.precioProd, this.categoria,this.imageBox,this.tiendaid).subscribe(x =>{
        this.toastExito();
        this.navCtrl.pop();
      })
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
    if(this.nombreProd == ""){
      ret = false;
      msg += "Debe completar el nombre";
    }
    if(this.detalleProd == ""){
      ret = false;
      msg += "Debe completar el detalle";
    }
    if(this.imageBox.length == 0){
      ret = false;
      msg += "Debe agregar al menos una imagen";
    }
    if(this.precioProd == 0){
      ret = false;
      msg += "Debe completar el precio";
    }
    if(this.categoria == 0){
      ret = false;
      msg += "Debe seleccionar una categoria";
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
  
   abrirGaleria(){
     const options : CameraOptions = {
       quality: 30,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE,
       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
     }
  
     this.camera.getPicture(options).then((imageData)=>{
       this.base64Image = 'data:image/jpeg;base64,'+imageData;
       this.imageBox.push(this.base64Image);
     
       console.log('ArrayImage',this.imageBox);
     }, (err)=>{
       console.log('err en getPicture',err);
     })
   }
   eliminarImg(index){
     this.imageBox.splice(index, 1);
   }
  

}
