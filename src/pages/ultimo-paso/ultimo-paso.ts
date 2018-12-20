import { CreateCvPage } from './../create-cv/create-cv';
import { CurriculumPage } from './../curriculum/curriculum';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: 'page-ultimo-paso',
  templateUrl: 'ultimo-paso.html',
})
export class UltimoPasoPage {

  checkTerminos:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  selected(event){
    this.checkTerminos = !this.checkTerminos;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UltimoPasoPage');
  }

  goToCurriculum(){
    this.navCtrl.push(CreateCvPage);
  }

  goToHome(){
    this.navCtrl.push(MenuPage);    
  }
}
