import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisComerciosPage } from './mis-comercios';

@NgModule({
  declarations: [
    MisComerciosPage,
  ],
  imports: [
    IonicPageModule.forChild(MisComerciosPage),
  ],
})
export class MisComerciosPageModule {}
