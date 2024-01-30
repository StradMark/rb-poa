import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerDetailsComponent } from './customer-details.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CustomerDetail } from '../../types/customer';

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;
  let closeSelectedSpy: jasmine.Spy;
  let customerData: CustomerDetail = {
    id: 'guid',
    initials: 'J',
    surnamePrefix: 'van der',
    surname: 'Doe',
    sex: 'male',
    birthDate: '1990-01-01',
    streetName: 'Main Street',
    houseNumber: '123',
    houseNumberExtension: 'A',
    postalCode: '1234 AB',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomerDetailsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    closeSelectedSpy = spyOn(component.closeSelected, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render customer details when customer is not provided', () => {
    fixture.detectChanges();

    const customerDetailsElement: DebugElement = fixture.debugElement.query(
      By.css('#customer-details')
    );

    expect(customerDetailsElement).toBeFalsy();
  });

  it('should render customer details when customer is provided', () => {
    component.customer = customerData;
    fixture.detectChanges();

    const customerDetailsElement: DebugElement = fixture.debugElement.query(
      By.css('.bg-white')
    );

    expect(customerDetailsElement).toBeTruthy();
    expect(customerDetailsElement.nativeElement.textContent).toContain(
      `${customerData.initials}. ${customerData.surnamePrefix} ${customerData.surname}`
    );
    expect(customerDetailsElement.nativeElement.textContent).toContain(
      `Sex: ${customerData.sex}`
    );
    expect(customerDetailsElement.nativeElement.textContent).toContain(
      `Date of birth: ${customerData.birthDate}`
    );
    expect(customerDetailsElement.nativeElement.textContent).toContain(
      `Street: ${customerData.streetName} ${customerData.houseNumber}${customerData.houseNumberExtension}`
    );
    expect(customerDetailsElement.nativeElement.textContent).toContain(
      `Postal code: ${customerData.postalCode}`
    );
  });

  it('should emit closeSelected event when close button is clicked', () => {
    const mockCustomer: CustomerDetail = customerData;

    component.customer = mockCustomer;
    fixture.detectChanges();

    const closeButton: DebugElement = fixture.debugElement.query(
      By.css('#details-close-btn')
    );
    closeButton.nativeElement.click();

    expect(closeSelectedSpy).toHaveBeenCalled();
  });
});