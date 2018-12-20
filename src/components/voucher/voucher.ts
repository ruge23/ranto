import { Component } from '@angular/core';

/**
 * Generated class for the VoucherComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'voucher',
  templateUrl: 'voucher.html'
})
export class VoucherComponent {

  text: string;

  constructor() {
    console.log('Hello VoucherComponent Component');
    this.text = 'Hello World';
  }

}
