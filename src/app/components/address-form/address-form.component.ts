import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent {
  @Output() submitForm: EventEmitter<{
    postalCode: string;
    houseNumber: string;
  }> = new EventEmitter();

  addressForm = this.formBuilder.group({
    postalCode: ['', [Validators.required, this.postalCodeValidator()]],
    houseNumber: ['', [Validators.required, this.houseNumberValidator()]],
  });

  constructor(private formBuilder: NonNullableFormBuilder) {}

  get postalCode() {
    return this.addressForm.get('postalCode');
  }

  get houseNumber() {
    return this.addressForm.get('houseNumber');
  }

  postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Regular expression for Dutch postal code (NL format), can make variable in future
      const postalCodeRegex = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
      const valid = postalCodeRegex.test(control.value);

      return valid ? null : { postalCode: true };
    };
  }

  houseNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const houseNumberRegex = /[0-9].*/;
      const valid = houseNumberRegex.test(control.value);

      return valid ? null : { houseNumber: true };
    };
  }

  onSubmit(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    this.submitForm.emit({
      postalCode: this.addressForm.controls.postalCode.value,
      houseNumber: this.addressForm.controls.houseNumber.value,
    });
  }
}
