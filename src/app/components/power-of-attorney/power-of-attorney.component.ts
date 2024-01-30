import { Component } from '@angular/core';
import { CustomersTableComponent } from '../customers-table/customers-table.component';
import { CustomerDetail } from '../../types/customer';
import { CustomerService } from '../../services/customer.service';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressFormComponent } from '../address-form/address-form.component';
import { NameFormComponent } from '../name-form/name-form.component';

@Component({
  selector: 'app-power-of-attorney',
  standalone: true,
  imports: [
    CustomersTableComponent,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    AddressFormComponent,
    NameFormComponent,
  ],
  templateUrl: './power-of-attorney.component.html',
  styleUrl: './power-of-attorney.component.scss',
})
export class PowerOfAttorneyComponent {
  postalCodeValue: string = '';
  houseNumberValue: string = '';
  nameValue: string = '';

  customerData: CustomerDetail[] = [];
  errorMessage: string = '';
  loadingCustomerData: boolean = false;

  selectedTab: string = '';
  tabs: { id: string; displayName: string }[] = [
    {
      id: 'address-tab',
      displayName: 'Search by address',
    },
    {
      id: 'name-tab',
      displayName: 'Search by name',
    },
  ];

  constructor(private customerService: CustomerService) {
    this.selectedTab = this.tabs[0].id;
  }

  selectTab(id: string) {
    this.selectedTab = id;
  }

  getCustomerData(formData: {
    [key in keyof CustomerDetail]?: CustomerDetail[key];
  }): void {
    this.customerData = [];
    this.loadingCustomerData = true;
    this.errorMessage = '';

    setTimeout(() => {
      this.customerService.getCustomers(formData).subscribe({
        next: (data: CustomerDetail[]) => {
          this.customerData = data;
        },
        error: (error: string) => {
          this.errorMessage = error;
        },
        complete: () => {
          this.loadingCustomerData = false;
        },
      });
    }, 1000);
  }
}
