import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersTableComponent } from './customers-table.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { By } from '@angular/platform-browser';
import { CustomerDetail } from '../../types/customer';

describe('CustomersTableComponent', () => {
  let component: CustomersTableComponent;
  let fixture: ComponentFixture<CustomersTableComponent>;
  let customerData: CustomerDetail[] = [
    {
      id: 'guid',
      initials: 'A',
      surnamePrefix: 'van',
      surname: 'Doe',
      sex: 'female',
      postalCode: '12345',
      houseNumber: '42',
      houseNumberExtension: 'A',
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table header correctly when customerData is available', () => {
    component.customerData = customerData;
    fixture.detectChanges();

    const tableHeaders = fixture.debugElement.queryAll(By.css('.table-head'));
    expect(tableHeaders.length).toBe(5);
    expect(tableHeaders[0].nativeElement.textContent).toContain('Initials');
  });

  it('should render table body correctly when customerData is available', () => {
    component.customerData = customerData;
    fixture.detectChanges();

    const tableCells = fixture.debugElement.queryAll(By.css('.table-cell'));
    expect(tableCells.length).toBe(5); //
    expect(tableCells[0].nativeElement.textContent).toContain('A');
  });

  it('should trigger selectCustomer method when a row is clicked', () => {
    component.customerData = [customerData[0]];
    fixture.detectChanges();
    spyOn(component, 'selectCustomer');

    const rows = fixture.debugElement.queryAll(By.css('.table-row'));
    expect(rows.length).toBeGreaterThan(0);

    rows.forEach((row) => {
      row.triggerEventHandler('click', null);
    });
    expect(component.selectCustomer).toHaveBeenCalledTimes(rows.length);
  });

  it('should render CustomerDetailsComponent when selectedCustomer is not null', () => {
    component.selectedCustomer = customerData[0];
    fixture.detectChanges();

    const customerDetailsComponent = fixture.debugElement.query(
      By.directive(CustomerDetailsComponent)
    );
    expect(customerDetailsComponent).toBeTruthy();
  });

  it('should call handleCloseDetails method when CustomerDetailsComponent emits closeSelected event', () => {
    spyOn(component, 'handleCloseDetails');

    const customerDetailsComponent = fixture.debugElement.query(
      By.directive(CustomerDetailsComponent)
    );
    customerDetailsComponent.triggerEventHandler('closeSelected', null);

    expect(component.handleCloseDetails).toHaveBeenCalled();
  });
});
