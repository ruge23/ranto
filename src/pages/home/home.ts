import { IntEventoPage } from './../int-evento/int-evento';
import { ServicesProvider, evento } from './../../providers/services/services';
import { AllCategoriesPage } from './../all-categories/all-categories';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { LoginPage } from './../login/login';
import { EventosDiaPage } from './../eventos-dia/eventos-dia';

import { CategoriasPage } from './../categorias/categorias';
//import { PRODUCTOS } from '../../data/listProducts-mok';
import { InternaProdPage } from '../interna-prod/interna-prod';
//import { VOUCHERS } from '../../data/vouchers-mok';
import { IntVoucherPage } from '../int-voucher/int-voucher';
/**
 * Generated class for the SeccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  expanded1: boolean = false;
  expanded2: boolean = false;
  expanded3: boolean = false;
  visible1: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  miscategorias: any;
  products: any = [];
  vouchers: any = [];
  lista1: any = [];
  lista2: any = [];
  lista3: any = [];
  eventos: evento[];
  ultProd: any = [];
  urlImg: string = 'http://ctrlztest.com.ar/ranto/apirest/upload/';
  localidad: string;
  fbId:any;
  urlImgFb:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public app: App,
    private service: ServicesProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    this.fbId = this.service.fbIdUser ? this.service.fbIdUser : false;
    this.urlImgFb="http://graph.facebook.com/"+this.fbId+"/picture?type=square";
    this.presentLoadingDefault();
    //this.getProducts();
    this.getVouchers();
    this.getEventos();
    this.getUltimosSubidos();
    this.getMisCategorias();
    this.setUserData();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Espere por favor...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
  

  setUserData() {
    console.log('aqui', this.service._usuario)
    let x = Object.keys(this.service._usuario);
    if (x.length == 0) {
    //console.log('aqui2', this.service._usuario)
      this.storage.get("_uid_").then(x => {
        console.log(x);
        this.service.getUserporid(x).subscribe(asd => {
          
          this.service._usuario = JSON.parse(asd['data'])[0];
          //console.log('asd', this.service._usuario[0])
          this.localidad = this.service._usuario.localidad;
        });
      });
    }
    else{
      this.localidad = this.service._usuario.localidad;
    }
  }

  getMisCategorias() {
    this.service.getMisCategorias().subscribe(x => {
      this.miscategorias = JSON.parse(x['data']);
      //console.log('mis categorias',JSON.parse(x['data']));    
    })
  }


  getUltimosSubidos() {
    this.service.getUltimosSubidos().subscribe(x => {
      this.ultProd = JSON.parse(x['data']);
      console.log('ultProd', this.ultProd);
    })
  }

  getVouchers() {
    this.service.getMisVouchers().subscribe(x => {
      this.vouchers = JSON.parse(x['data']);
      //console.log('voucher',this.vouchers);
    })
  }

  getEventos() {
    this.service.getEventos().subscribe(x => {
      //console.log('eventos',JSON.parse(x['data']))
      this.eventos = JSON.parse(x['data']);
      this.eventos.map(x => x.imgpath = (this.urlImg + x.imgpath))

    })
  }

  expandItem(x) {
    switch (x) {
      case 1:
        this.expanded1 = !this.expanded1;
        this.visible1 = !this.visible1;
        break;
      case 2:
        this.expanded2 = !this.expanded2;
        this.visible2 = !this.visible2;
        break;
      case 3:
        this.expanded3 = !this.expanded3;
        this.visible3 = !this.visible3;
        break;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  presentModal(page) {
    const modal = this.modalCtrl.create(page);
    modal.present();
  }

  goToCategories(categoriaid) {
    this.navCtrl.push(CategoriasPage, categoriaid);
  }

  goToAllCategories() {
    this.navCtrl.push(AllCategoriesPage)
  }

  goToPerfil() {
    this.navCtrl.push(PerfilPage);
  }

  logoutme() {
    //this.navCtrl.push(WelcomePage);
    this.app.getRootNav().setRoot(LoginPage, {});
  }

  goToCat() {
    this.navCtrl.push(CategoriasPage);
  }

  goToIntProd(product) {
    this.navCtrl.push(InternaProdPage, product);
  }

  goToIntVoucher(voucher) {
    this.navCtrl.push(IntVoucherPage, voucher);
  }

  goToInternaEvento(evento){
    this.navCtrl.push(IntEventoPage, evento);
  }

}

