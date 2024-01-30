import { Component, Input, SimpleChanges } from '@angular/core';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { CustomerDetail } from '../../types/customer';
import { NgForOf, NgIf } from '@angular/common';
@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [CustomerDetailsComponent, NgForOf, NgIf],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent {
  @Input() customerData: CustomerDetail[];

  constructor() {
    this.customerData = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check for changes to the watched variable
    if (changes['customerData']) {
      this.selectedCustomer = null;
    }
  }

  selectedCustomer: CustomerDetail | null = null;

  selectCustomer(customer: CustomerDetail): void {
    this.selectedCustomer = customer;
  }

  handleCloseDetails(): void {
    this.selectedCustomer = null;
  }
}
