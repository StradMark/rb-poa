import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CustomerDetail } from '../types/customer';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = './assets';

  constructor(private http: HttpClient) {}

  public getCustomers(query: {
    [key in keyof CustomerDetail]?: CustomerDetail[key];
  }): Observable<CustomerDetail[]> {
    const params = new HttpParams();

    for (const [key, value] of Object.entries(query)) {
      if (value) {
        params.set(key, value);
      }
    }

    return this.http
      .get<CustomerDetail[]>(this.apiUrl + '/customers.json', { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () =>
        new Error(
          'An error has occurred while looking up customer data, please try again later'
        )
    );
  }
}
