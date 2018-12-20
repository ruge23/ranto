import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetallePuestoPage } from '../detalle-puesto/detalle-puesto';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the SearchResultTrabajoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result-trabajo',
  templateUrl: 'search-result-trabajo.html',
})
export class SearchResultTrabajoPage {
  items: any;
  fromItems: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider: ServicesProvider) {
    this.fromItems = 0;
    serviceProvider.buscarEmpleos(navParams.data, this.fromItems).subscribe(x => {
      this.items = JSON.parse(x["data"]);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultTrabajoPage');
  }

  goToInterna(item){
  this.navCtrl.push(DetallePuestoPage, item);
  }
}
