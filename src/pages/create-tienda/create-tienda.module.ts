import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTiendaPage } from './create-tienda';

@NgModule({
  declarations: [
    CreateTiendaPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTiendaPage),
  ],
})
export class CreateTiendaPageModule {}
