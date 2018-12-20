import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-create-cv',
  templateUrl: 'create-cv.html',
})
export class CreateCvPage {

  expanded1:boolean=false;
  expanded2:boolean=false;
  expanded3:boolean=false;
  visible1:boolean=false;
  visible2:boolean=false;
  visible3:boolean=false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCvPage');
  }

  expandItem(x) {
    switch(x){
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

}
