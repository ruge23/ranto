import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//import { POSTULADOS } from './../../data/postulados-mok';
import { VerCurriculumPage } from '../ver-curriculum/ver-curriculum';

@IonicPage()
@Component({
  selector: 'page-postulados',
  templateUrl: 'postulados.html',
})
export class PostuladosPage {

  postulados : any=[];
  puestoid: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private services: ServicesProvider
  ) {
    this.puestoid = navParams.data;
    this.getPostulados();
  }

  getPostulados(){
    this.services.getPostulados(this.puestoid).subscribe((x)=>{
      this.postulados = JSON.parse(x["data"]);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostuladosPage');
  }

  goToPerfil(data){
    this.navCtrl.push(VerCurriculumPage, data.usuarioid);
  }

}
