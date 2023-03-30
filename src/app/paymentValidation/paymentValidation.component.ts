import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {formatCardNumber, formatExpiryDate} from "./utils";

@Component({
  selector: 'payment-validation',
  templateUrl: './paymentValidation.component.html',
  styleUrls: ['./paymentValidation.component.scss']
})

export class PaymentValidation {
  cardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.cardForm = this.fb.group({
      number: ['', []],
      name: ['', []],
      month: ['', []],
      year: ['', []],
      cvv: ['', []],
    });
  }

  get cardNumber() {
    return formatCardNumber(this.cardForm.controls['number'].value)
  }

  get cardExpiryMonth() {
    return formatExpiryDate(this.cardForm.controls['month'].value)
  }

  get cardExpiryYear() {
    return formatExpiryDate(this.cardForm.controls['year'].value)
  }

  get cardHolderName() {
    return this.cardForm.controls['name'].value || 'Card Holder Name'
  }
}
