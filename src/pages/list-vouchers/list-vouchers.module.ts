import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListVouchersPage } from './list-vouchers';

@NgModule({
  declarations: [
    ListVouchersPage,
  ],
  imports: [
    IonicPageModule.forChild(ListVouchersPage),
  ],
})
export class ListVouchersPageModule {}
