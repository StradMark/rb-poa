import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { PowerOfAttorneyComponent } from './components/power-of-attorney/power-of-attorney.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomersTableComponent, PowerOfAttorneyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
