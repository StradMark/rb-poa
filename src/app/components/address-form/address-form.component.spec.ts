import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressFormComponent } from './address-form.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let submitFormSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddressFormComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    submitFormSpy = spyOn(component.submitForm, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error messages for invalid postal code and house number', fakeAsync(() => {
    component.addressForm.controls['postalCode'].setValue('123');
    component.addressForm.controls['houseNumber'].setValue('abc');
    fixture.detectChanges();

    tick(); // Simulate the passage of time until all pending asynchronous activities finish

    const postalCodeInput: DebugElement = fixture.debugElement.query(
      By.css('#postal-code')
    );

    const houseNumberInput: DebugElement = fixture.debugElement.query(
      By.css('#house-number')
    );
    const submitButton: DebugElement = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );

    // Ensure that the elements are found before accessing their properties
    expect(postalCodeInput).toBeTruthy();
    expect(houseNumberInput).toBeTruthy();

    submitButton.nativeElement.click();

    fixture.detectChanges();

    const postalCodeError: DebugElement = fixture.debugElement.query(
      By.css('#postalcode-error')
    );
    const houseNumberError: DebugElement = fixture.debugElement.query(
      By.css('#housenumber-error')
    );

    expect(postalCodeError.nativeElement.textContent).toContain(
      'Postal Code is of incorrect format'
    );
    expect(houseNumberError.nativeElement.textContent).toContain(
      'House Number is of incorrect format'
    );
  }));

  it('should emit submitForm event when form is submitted with valid values', fakeAsync(() => {
    component.addressForm.controls['postalCode'].setValue('1234AB');
    component.addressForm.controls['houseNumber'].setValue('42');
    fixture.detectChanges();

    const submitButton: DebugElement = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );

    submitButton.nativeElement.click();
    tick(); // Simulate the passage of time until all pending asynchronous activities finish

    fixture.detectChanges();

    expect(submitFormSpy).toHaveBeenCalledWith({
      postalCode: '1234AB',
      houseNumber: '42',
    });
  }));
});
