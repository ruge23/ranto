import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCategoriesPage } from './select-categories';

@NgModule({
  declarations: [
    SelectCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectCategoriesPage),
  ],
})
export class SelectCategoriesPageModule {}
