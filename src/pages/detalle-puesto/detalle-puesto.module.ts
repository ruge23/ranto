import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePuestoPage } from './detalle-puesto';

@NgModule({
  declarations: [
    DetallePuestoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePuestoPage),
  ],
})
export class DetallePuestoPageModule {}
