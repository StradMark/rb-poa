import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomerDetail } from '../../types/customer';
import { NgIf, JsonPipe, NgFor, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [NgIf, JsonPipe, NgFor, KeyValuePipe],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent {
  @Input() customer?: CustomerDetail | null;
  @Output() closeSelected: EventEmitter<void> = new EventEmitter<void>();

  emitClose(): void {
    this.closeSelected.emit();
  }
}
