import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PowerOfAttorneyComponent } from './power-of-attorney.component';
import { CustomersTableComponent } from '../customers-table/customers-table.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { NameFormComponent } from '../name-form/name-form.component';
import { CustomerService } from '../../services/customer.service';
import { of, throwError } from 'rxjs';

describe('PowerOfAttorneyComponent', () => {
  let fixture: ComponentFixture<PowerOfAttorneyComponent>;
  let component: PowerOfAttorneyComponent;
  let customerService: CustomerService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        PowerOfAttorneyComponent,
        CustomersTableComponent,
        AddressFormComponent,
        NameFormComponent,
      ],
      providers: [CustomerService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerOfAttorneyComponent);
    component = fixture.componentInstance;
    customerService = TestBed.inject(CustomerService);
    spyOn(customerService, 'getCustomers').and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a tab', () => {
    const tabId = component.tabs[1].id;
    component.selectTab(tabId);
    expect(component.selectedTab).toBe(tabId);
  });
});
