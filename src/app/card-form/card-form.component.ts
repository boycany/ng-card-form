import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateFormControl } from '../date-form-control';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent {
  cardForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
      Validators.pattern(/^[\u4e00-\u9fa5]+$|^[a-zA-Z\s,'-]+$/), //中文、英文、space、特殊符號,'-
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
    ]),
    expiration: new DateFormControl('', [
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ]),
  });

  constructor() {
    console.log(this.cardForm.get('name'));
  }

  onSubmit() {
    console.log('Form was submitted');
  }
  onResetClick() {
    this.cardForm.reset(); //是將每個 FormControl 的實體都設定成 null，而不是初始值

    const { name, cardNumber, securityCode } = this.cardForm.controls;
    name.setValue('');
    cardNumber.setValue('');
    securityCode.setValue(''); //用 setValue() 將 value 設置為 ''
  }
}
