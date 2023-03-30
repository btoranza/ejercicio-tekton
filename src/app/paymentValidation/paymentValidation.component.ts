import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { formatCardNumber, formatExpiryDate } from './utils';

@Component({
  selector: 'payment-validation',
  templateUrl: './paymentValidation.component.html',
  styleUrls: ['./paymentValidation.component.scss'],
})
export class PaymentValidation {
  cardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.cardForm = this.fb.group({
      number: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      month: [
        '',
        [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])$')],
      ],
      year: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{4}$/),
          Validators.min(new Date().getFullYear()),
          Validators.max(new Date().getFullYear() + 3),
        ],
      ],

      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    });
  }

  get cardNumber() {
    return formatCardNumber(this.cardForm.controls['number'].value);
  }

  get cardExpiryMonth() {
    return formatExpiryDate(this.cardForm.controls['month'].value);
  }

  get cardExpiryYear() {
    return formatExpiryDate(this.cardForm.controls['year'].value);
  }

  get cardHolderName() {
    return this.cardForm.controls['name'].value || 'Card Holder Name';
  }

  toggleErrorMessage(control: AbstractControl): boolean {
    console.log(control);
    if (control.invalid && (control.dirty || control.touched)) {
      return true;
    } else {
      return false;
    }
  }
}
