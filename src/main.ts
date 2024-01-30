import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


  /* 
  
  Search 
  Search element to contain several inputs
  - Postal code input
  - House number input
  - Name input
  - Search button

  Validation 
  -postal code valid 0000 XX
  - Postal code + number entered
  - Name entered OR postal code & number


  CustomerList component
  - Show list of found elements
  - Show no entries found

  Customer component
  - Feed data from outside (cuustomer = selectedCustomer)
  - Show basic information


  */
