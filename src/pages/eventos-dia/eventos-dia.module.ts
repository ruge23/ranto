import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventosDiaPage } from './eventos-dia';

@NgModule({
  declarations: [
    EventosDiaPage,
  ],
  imports: [
    IonicPageModule.forChild(EventosDiaPage),
  ],
})
export class EventosDiaPageModule {}
