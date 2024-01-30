import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';
import { CustomerDetail } from '../types/customer';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpTestingController: HttpTestingController;
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
      imports: [HttpClientTestingModule],
      providers: [CustomerService],
    });

    service = TestBed.inject(CustomerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get customers successfully', inject(
    [CustomerService],
    (customerService: CustomerService) => {
      const mockCustomers: CustomerDetail[] = [customerData];

      const queryParams = {surname: customerData.surname}
      customerService.getCustomers(queryParams).subscribe(customers => {
        console.log(customers);
        expect(customers).toEqual(mockCustomers);
      });

      const req = httpTestingController.expectOne(request => {
        return (
          request.method === 'GET' &&
          request.url === `./assets/customers.json`
        );
      });

      req.flush(mockCustomers);
      httpTestingController.verify();
    }
  ));

  it('should handle errors when getting customers', inject(
    [CustomerService],
    (customerService: CustomerService) => {
      const errorMessage = 'An error has occurred while looking up customer data, please try again later';

      customerService.getCustomers({}).subscribe(
        () => fail('expected an error, but received data'),
        error => {
          expect(error.message).toContain(errorMessage);
        }
      );

      const req = httpTestingController.expectOne(request => {
        return (
          request.method === 'GET' &&
          request.url === `./assets/customers.json`
        );
      });

      req.flush({}, { status: 500, statusText: 'Internal Server Error' });
      httpTestingController.verify();
    }
  ));
});