import { SelectCategoriesPage } from "./../select-categories/select-categories";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController
} from "ionic-angular";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
//import { MenuPage } from './../menu/menu';
import { SignupPage } from "./../signup/signup";
import { ServicesProvider } from "../../providers/services/services";
import { MenuPage } from "../menu/menu";
/* import { HomePage } from './../home/home';
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  username: string;
  pw: string;
  showMsgError: boolean = false;
  msgError: string = "";
  constructor(
    public toastCtrl: ToastController, 
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public fb: Facebook,
    public serviceProvider: ServicesProvider
  ) { }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  signin() {
    if (this.validacion()) {
      this.serviceProvider.login(this.username, this.pw)
        .subscribe(x => {
          console.log("login", x);
          let userid = JSON.parse(x["data"]).usuarioid;
          if (userid != null) {
            console.log("mi id:", userid);
            this.serviceProvider.setUserId(JSON.parse(x['data']).usuarioid);
            this.serviceProvider._usuario = JSON.parse(x["data"]);
            // this.setUserId(this._usuario.usuarioid);
            this.navCtrl.setRoot(MenuPage);
          }
          else {
            //msgerror	
            this.msgError = "El usuario y/o la contrasenia son incorrectos."
            this.showMsgError = true;
            this.toastError();
          }
        });
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
    if (this.username == "") {
      ret = false;
      msg += "Debe completar el email\n";
    }
    if (this.pw == "") {
      ret = false;
      msg += "Debe completar el password";
    }
   
    this.msgError = msg;
    return ret;
  }


  toastError() {
    let toast = this.toastCtrl.create({
      message: this.msgError,
      showCloseButton: true,
      duration: 5000,
      closeButtonText: "X",
      position: 'top',
      cssClass: 'toastError'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  createAccount() {
    const modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

  fblogin() {
    //permissions
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        if (res.status == "connected") {
          console.log('entro');
          //Get user ID an Token
          var fb_id = res.authResponse.userID;
          var fb_token = res.authResponse.accessToken;
          this.serviceProvider.fbIdUser = fb_id;
          
          console.log('id and toke', fb_id, fb_token);

          //Get user infos from the API
          this.fb.api("/me?fields=name,email", [])
            .then((user) => {
              var name = user.name;
              var email = user.email;
              if (email != "") {
                //this.storage.set('emailFB', email);
                //this.service.getTokenEmail(email);  
                this.navCtrl.push(SignupPage);
              }
            });
        } else {
          //error ocurred while loging-in
          console.log("Error ocurred")
        }
      })
      .catch((error) => {
        console.log('Error logging into Facebook', error);
      });
  }
}
