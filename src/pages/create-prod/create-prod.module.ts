import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateProdPage } from './create-prod';

@NgModule({
  declarations: [
    CreateProdPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateProdPage),
  ],
})
export class CreateProdPageModule {}
